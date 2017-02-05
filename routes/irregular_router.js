var Router = require("express").Router;
var IrregularRepository = require('../app/irregular_repository').IrregularRepository;

var IrregularRouter = Router();

IrregularRouter.get("/list", function (req, res, next) {
    IrregularRepository.list(function (err, irregulars) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok", data: {irregulars: irregulars}});
    });
});

module.exports = IrregularRouter;