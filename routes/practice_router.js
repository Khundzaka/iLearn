var Router = require("express").Router;
var PracticeRepository = require("../app/practice_repository").PracticeRepository;
var practiceRouter = Router();

practiceRouter.post("/submit", function (req, res, next) {
    PracticeRepository.saveResult({practiceData: req.body, user: req.user}, function (err, result) {
        if (err) {
            return next(err);
        }
        PracticeRepository.getOne({uid: result._id}).then(function (practiceResult) {
            return res.json({status: "ok", data: {result: practiceResult}});
        }).catch(next);
    });
});

practiceRouter.get("/fetch/:uid", function (req, res, next) {
    PracticeRepository.getOne({uid: req.params.uid}).then(function (practiceResult) {
        return res.json({status: "ok", data: {result: practiceResult}});
    }).catch(next);
});

module.exports = practiceRouter;