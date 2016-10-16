var Router = require("express").Router;
var WordRepository = require("../app/word_repository").WordRepository;
//var requiresPermission = require("../app/middleware").requiresPermission;
var wordRouter = Router();

var defaultFailResponse = {status: "failed"};

// todo: router needs auth

wordRouter.post("/find", function (req, res) {
    WordRepository.find({value: req.body.value, accepted: true}, function (err, words) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: {words: words}});
    });
});

module.exports = wordRouter;