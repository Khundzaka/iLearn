var Router = require("express").Router;
var WordRepository = require('../../app/word_repository').WordRepository;

var apanelWordRouter = Router();

apanelWordRouter.get("/list", function (req, res, next) {
    WordRepository.list(req.query).then(function (data) {
        return res.json(data);
    }).catch(next);
});

apanelWordRouter.get("/one/:word", function (req, res, next) {
    WordRepository.one({uid: req.params.word}, function (err, word) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok", data: {word: word}});
    });
});

apanelWordRouter.get("/pending", function (req, res, next) {
    WordRepository.pending(function (err, words) {
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

apanelWordRouter.post("/modify", function (req, res, next) {
    var params = req.body;
    WordRepository.modify(params, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok"});
    });
});

module.exports = apanelWordRouter;