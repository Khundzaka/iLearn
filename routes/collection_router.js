var Router = require("express").Router;
var CollectionRepository = require("../app/collection_repository").CollectionRepository;
//var requiresPermission = require("../app/middleware").requiresPermission;
var collectionRouter = Router();

var defaultFailResponse = {status: "failed"};

// todo: router needs auth

collectionRouter.get("/find", function (req, res) {
    CollectionRepository.getAcceptedPublic(req.query, function (err, collections) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: {collections: collections}});
    });
});

collectionRouter.get("/my", function (req, res) {
    console.log(req.user);
    CollectionRepository.getUserCollections({user: req.user}, function (err, collections) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: {collections: collections}});
    });
});

collectionRouter.get("/:collection", function (req, res) {
    CollectionRepository.getOne({collectionId: req.params.collection}, function (err, data) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: data});
    });
});

collectionRouter.post("/", function (req, res) {
    CollectionRepository.create({user: req.user, data: req.body}, function (err, collection) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: {id: collection._id}});
    });
});

collectionRouter.put("/", function (req, res) {
    CollectionRepository.update({user: req.user, data: req.body}, function (err, data) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok"});
    });
});

collectionRouter.post("/word/add", function (req, res) {
    var collectionId = req.body.collectionId;
    var wordId = req.body.wordId;
    CollectionRepository.addWord({collectionId: collectionId, wordId: wordId, user: req.user}, function (err) {
        return res.json({status: "ok"});
    });
});

collectionRouter.post("/word/remove", function (req, res) {
    var collectionId = req.body.collectionId;
    var wordId = req.body.wordId;
    CollectionRepository.removeWord({collectionId: collectionId, wordId: wordId, user: req.user}, function (err) {
        return res.json({status: "ok"});
    });
});

collectionRouter.post("/word/new", function (req, res) {
    var passedWord = {value: req.body.wordName, description: req.body.wordDescription};
    var collectionId = req.body.collectionId;

    CollectionRepository.addNewWord({word: passedWord, user: req.user, collectionId: collectionId}, function (err) {
        return res.json({status: "ok"});
    });
});

module.exports = collectionRouter;