var Router = require("express").Router;
var ForumRepository = require("../app/forum_repository").ForumRepository;
//var requiresPermission = require("../app/middleware").requiresPermission;
var forumRouter = Router();

var defaultFailResponse = {status: "failed"};

// todo: router needs auth


forumRouter.get("/", function (req, res) {
    ForumRepository.topicList(function (err, topics) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: {topics: topics}});
    });
});

forumRouter.get("/topic/one/:topic", function (req, res) {
    ForumRepository.fetchOneTopic({uid: req.params.topic}, function (err, topic) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: {topic: topic}});
    });
});

forumRouter.get("/post/one/:post", function (req, res) {
    ForumRepository.fetchOnePost({uid: req.params.post}, function (err, post) {
        if (err) {
            console.log(err);
            return res.json(defaultFailResponse);
        }

        res.json({status: "ok", data: {post: post}});
    });
});

module.exports = forumRouter;