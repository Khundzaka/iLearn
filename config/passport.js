// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var async = require("async");

// load up the user model
var Account = require('../models/account');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Account.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {

            // asynchronous
            process.nextTick(function () {
                Account.findOne({'local.email': email}, "+local.password", function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.checkPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    // all is well, return user
                    else {
                        user.local.password = null;
                        return done(null, user);
                    }
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-register', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {

            // asynchronous 
            process.nextTick(function () {
                async.waterfall([

                        // check if username exists
                        function (cbck) {
                            Account.findOne({'local.username': req.body.username}, function (err, existing) {
                                console.log(existing);
                                if (existing) {
                                    req.flash('signupMessage', 'username_exists');
                                }
                                cbck(err, existing);
                            });
                        },

                        // check if mail exists
                        function (existing, cbck) {
                            if (existing) {
                                return cbck(null, existing);
                            }
                            Account.findOne({'local.email': email}, "+local.password", function (err, existingUser) {
                                if (existingUser) {
                                    req.flash('signupMessage', 'email_exists');
                                }
                                cbck(err, existingUser);
                            });
                        }
                    ],

                    //last callback
                    function (err, existing) {
                        if (err) {
                            return done(err);
                        }
                        if (existing) {
                            return done(null, false);
                        }

                        //  If we're logged in, we're connecting a new local account.
                        if (req.user) {
                            if (typeof req.user.local.email !== 'undefined') {
                                return done(null, false, req.flash('signupMessage', 'logged_in'));
                            }
                            var user = req.user;
                            user.local.email = email;
                            user.local.username = req.body.username;
                            user.local.password = user.generateHash(password);
                            user.save(function (err) {
                                if (err)
                                    throw err;
                                user.local.password = null;
                                return done(null, user);
                            });
                        }
                        //  We're not logged in, so we're creating a brand new user.
                        else {
                            // create the user
                            var newUser = new Account();

                            newUser.local.email = email;
                            newUser.local.username = req.body.username;
                            newUser.local.password = newUser.generateHash(password);

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                newUser.local.password = null;
                                return done(null, newUser);
                            });
                        }
                    });

            });

        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'link', 'email', 'name'],
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

        },
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    Account.findOne({'facebook.id': profile.id}, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                                user.facebook.email = profile.emails[0].value;

                                user.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new Account();
                            console.dir(profile);

                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = profile.emails[0].value;

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.facebook.id = profile.id;
                    user.facebook.token = token;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = profile.emails[0].value;

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });

                }
            });

        }));
};
