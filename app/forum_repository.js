var ForumPost = require("../models/forum_post");
var ForumTopic = require("../models/forum_topic");
var async = require("async");

var ForumRepository = {};

ForumRepository.fetchLatestPosts=function (callback) {
    ForumPost.find().sort([["created_at",'descending']]).limit(10).populate('user').populate('topic').exec(function (err,posts) {
        return callback(err,posts);
    })
};

ForumRepository.topicList = function (callback) {
    ForumTopic.find({active: true}).exec(function (err, topics) {
        return callback(err, topics);
    });
};

ForumRepository.allTopicList = function (callback) {
    ForumTopic.find().exec().then(function (topics) {
        callback(null, topics);
        return null;
    }).catch(function (err) {
        callback(err);
        return null;
    });
};

ForumRepository.fetchOneTopic = function (params, callback) {
    ForumTopic.findById(params.uid).exec(function (err, topic) {
        return callback(err, topic);
    });
};

ForumRepository.fetchOnePost = function (params, callback) {
    ForumPost.findById(params.uid).exec(function (err, post) {
        return callback(err, post);
    });
};

ForumRepository.fetchPostsByTopic = function (params, callback) {
    var page = params.page || 1;
    var limit = params.limit || 5;
    var skip = (page - 1) * limit || 0;
    var count=ForumPost.count({topic: params.topicId, deleted: false}).exec();

    ForumPost.find({topic: params.topicId, deleted: false}).populate('user').lean().skip(skip).limit(parseInt(limit)).exec(function (err, posts) {
        posts.forEach(function (post) {
            var user = {_id: post.user._id};
            if (post.user.local) {
                user.local = {username: post.user.local.username};
            }
            if (post.user.facebook) {
                user.facebook = {name: post.user.facebook.name};
            }
            post.user = user;
        });

        callback(err,{posts:posts,page:page,count: count});
    });
};


ForumRepository.createTopic = function (params, callback) {
    var topic = new ForumTopic({title: params.title, description: params.description, active: params.active});
    topic.save(function (err) {
        return callback(err, topic);
    });
};

ForumRepository.updateTopic = function (params, callback) {
    ForumTopic.findById(params.uid).exec().then(function (topic) {
        topic.title = params.title;
        topic.description = params.description;
        topic.active = params.active;
        topic.save(function (err) {
            return callback(err, topic);
        }).catch(function (err) {
            return callback(err);
        });
    });
};

ForumRepository.createPost = function (params, callback) {
    ForumTopic.findById(params.topicId).exec(function (err, topic) {
        if (err) {
            return callback(err);
        }
        var post = new ForumPost({text: params.text, topic: topic._id, user: params.user._id, deleted: false});
        post.save(function (err) {
            callback(err, post);
        });
    });
};

ForumRepository.updatePost = function (params, callback) {
    ForumPost.findById(params.uid).exec(function (err, post) {
        if (err) {
            return callback(err);
        }
        post.text = params.text;
        post.save(function (err) {
            callback(err, post);
        });
    });
};

ForumRepository.deletePost = function (params, callback) {
    ForumPost.findById(params.postId).exec(function (err, post) {
        if (err) {
            return callback(err);
        }
        post.deleted = true;
        post.save(function (err) {
            callback(err, post);
        });
    });
};


module.exports = {ForumRepository: ForumRepository};