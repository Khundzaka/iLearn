var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var errorHandler = require("errorhandler");
var Promise = require("bluebird");
var MongoStore = require('connect-mongo')(expressSession);
var flash = require('connect-flash');
var favicon = require('serve-favicon');

var apanelRouter = require("./routes/apanel_router");

// main config
var app = module.exports.app = exports.app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('trust proxy', 'loopback, uniquelocal');

app.use('/static', express.static(__dirname + '/static'));

app.use(favicon(__dirname + '/static/img/favicon.ico'));

app.use(flash());

app.use(morgan('combined'));
morgan.token('remote-addr', function (req, res) {
    return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser('your secret here'));
mongoose.Promise = Promise;
// mongoose
mongoose.connect('mongodb://localhost/learn_it');
var mongooseConnection = mongoose.connection;
app.use(expressSession({
    secret: 'wtftextishere23',
    maxAge: new Date(Date.now() + 3600000),
    resave: false,
    saveUninitialized: false,
    store: new MongoStore(
        {mongooseConnection: mongooseConnection},
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        })
}));
//app.use(expressSession({secret: "wtftextishere23", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'static')));


require('./config/passport')(passport);
//// passport config
//var Account = require('./models/account');
//passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());


// routes
require('./routes/default_routes')(app);
require('./routes/local_auth_routes')(app);
app.use('/apanel', apanelRouter);
var collectionRouter = require('./routes/collection_router');
var wordRouter = require('./routes/word_router');
var forumRouter = require('./routes/forum_router');
var practiceRouter = require('./routes/practice_router');
app.use('/api/collection', collectionRouter);
app.use('/api/forum', forumRouter);
app.use('/api/word', wordRouter);
app.use('/api/practice', practiceRouter);


if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
}

if (process.env.NODE_ENV === 'production') {
    app.use(errorHandler());
}

//error handling

// if (process.env.NODE_ENV === 'development') {
//
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.json({
//             status: "failed",
//             message: err.message,
//             error: err
//         });
//     });
//
// }
//
// if (process.env.NODE_ENV === 'production') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500).json({
//             status: "failed",
//             message: err.message,
//             error: {}
//         });
//     });
// }


app.listen(app.get('port'), function () {
    console.log(("Express server listening on port " + app.get('port')));
});
