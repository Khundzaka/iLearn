var Router = require("express").Router;
var UserRepository = require("../../app/user_repository").UserRepository;
var apanelUserRouter = Router();

// todo: router needs auth

apanelUserRouter.get("/", function (req, res, next) {
    UserRepository.findAll(function (err, users) {
        if (err) {
            return next(err);
        }
        console.log(users);

        return res.json({status: "ok", data: {users: users}});
    });
});

module.exports = apanelUserRouter;