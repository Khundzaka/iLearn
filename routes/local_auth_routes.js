var passport = require('passport');

module.exports = function (app) {

    app.get('/register', function (req, res) {
        res.render('register', {});
    });

    app.post('/local/register', function (req, res, next) {
        passport.authenticate('local-register', function (err, user, info) {
            if (err) {
                return res.json({status: "failed"});
            }
            if (!user) {
                return res.json({status: "failed"});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.json({status: "failed"});
                }
                return res.json(req.user);
            });
        })(req, res, next);
    });

    app.get('/login', function (req, res) {
        res.render('login', {user: req.user});
    });


    app.post('/local/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return res.json({status: "failed"});
            }
            if (!user) {
                return res.json({status: "failed"});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.json({status: "failed"});
                }
                return res.json(req.user);
            });
        })(req, res, next);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/local/logout', function (req, res) {
        req.logout();
        res.json({status: "ok"});
    });

    app.get('/check', function (req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        }
        else {
            res.json({status: "failed"});
        }
    });

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/'
        }),
        function (req, res) {
            res.redirect("/#/dashboard");
        }
    );
};
