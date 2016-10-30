var Router = require("express").Router;
var StatsRepository = require('../../app/stats_repository').StatsRepository;

var apanelStatsRouter = Router();

apanelStatsRouter.get("/summary", function (req, res, next) {
    StatsRepository.summary().then(function (data) {
        res.json({status: "ok", data: data});
    }).catch(function (err) {
        next(err);
    });
});

module.exports = apanelStatsRouter;