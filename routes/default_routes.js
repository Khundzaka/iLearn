var defaultConfig = require("../config/default");

module.exports = function (app) {

    app.get('/', function (req, res) {
        var serialized;
        if (req.isAuthenticated()) {
            serialized = JSON.stringify(req.user);
        } else {
            serialized = null;
        }
        res.render('index', {
            user: req.user,
            serialized: serialized,
            appVersion: defaultConfig.version
        });
    });

};