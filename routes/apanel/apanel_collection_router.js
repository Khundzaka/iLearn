var Router = require("express").Router;
var CollectionRepository = require('../../app/collection_repository').CollectionRepository;

var apanelCollectionRouter = Router();

apanelCollectionRouter.get("/", function (req, res, next) {
    // CollectionRepository.getAll(function (err, collections) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.json({status: "ok", data: {collections: collections}});
    // });
    CollectionRepository.getAll(req.query).then(function (data) {
        return res.json(data);
    }).catch(next);
});

apanelCollectionRouter.get("/pending", function (req, res, next) {
    CollectionRepository.pending(function (err, collections) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok", data: {collections: collections}});
    });
});

apanelCollectionRouter.post("/validate", function (req, res, next) {
    var params = req.body;
    CollectionRepository.validate(params, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok"});
    });
});

module.exports = apanelCollectionRouter;