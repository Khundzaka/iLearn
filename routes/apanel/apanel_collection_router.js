var Router = require("express").Router;
var CollectionRepository = require('../../app/collection_repository').CollectionRepository;

var apanelCollectionRouter = Router();

apanelCollectionRouter.get("/pending", function (req, res, next) {
    CollectionRepository.pending(function (err, words) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok", data: {words: words}});
    });
});

apanelWordRouter.post("/validate", function (req, res, next) {
    var params = req.body;
    WordRepository.validate(params, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok"});
    });
});

module.exports = apanelWordRouter;