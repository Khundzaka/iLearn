var Router = require("express").Router;
var ForumRepository = require('../../app/forum_repository').ForumRepository;

var apanelForumRouter = Router();

apanelForumRouter.get("/posts",function (req, res, next) {
    ForumRepository.fetchLatestPosts(function (err,posts) {
        if(err){
            return next(err);
        }
        res.json({status:"ok",data:{posts:posts}});
    })
})

apanelForumRouter.get("/", function (req, res, next) {
    ForumRepository.allTopicList(function (err, topics) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok", data: {topics: topics}});
    });
});

apanelForumRouter.post("/", function (req, res, next) {
    var params = req.body;
    ForumRepository.createTopic(params, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok"});
    });
});

apanelForumRouter.put("/", function (req, res, next) {
    var params = req.body;
    ForumRepository.updateTopic(params, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok"});
    });
});

apanelForumRouter.delete("/post/:post", function (req, res, next) {
    var params = {postId: req.params.post};
    ForumRepository.deletePost(params, function (err) {
        if (err) {
            return next(err);
        }
        res.json({status: "ok"});
    });
});

module.exports = apanelForumRouter;