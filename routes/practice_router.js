var Router = require("express").Router;
var PracticeRepository = require("../app/practice_repository").PracticeRepository;
var practiceRouter = Router();

practiceRouter.post("/submit", function (req, res, next) {
    PracticeRepository.saveResult({practiceData: req.body, user: req.user}, function (err, result) {
        if (err) {
            return next(err);
        }

        return res.json({status: "ok", data: {result: result}});
    });
});

module.exports = practiceRouter;