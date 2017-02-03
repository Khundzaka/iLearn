var Router = require("express").Router;
var IrregularRepository = require('../../app/irregular_repository').IrregularRepository;

var apanelIrregularRouter = Router();

apanelIrregularRouter.get("/list", function (req, res, next) {
    IrregularRepository.list(function (err, irregulars) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok", data: {irregulars: irregulars}});
    });
});

apanelIrregularRouter.get("/one/:irregular", function (req, res, next) {
    IrregularRepository.one({uid: req.params.irregular}, function (err, irregular) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok", data: {irregular: irregular}});
    });
});

apanelIrregularRouter.post("/modify", function (req, res, next) {
    var params = req.body;
    IrregularRepository.modify(params, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok"});
    });
});

apanelIrregularRouter.post("/", function (req, res) {
    var params = req.body;
    IrregularRepository.create(params, function (err, irregular) {
        if (err) {
            return res.json({status:"failed"});
        }
        res.json({status: "ok", data: {id: irregular._id}});
    });
});

module.exports = apanelIrregularRouter;