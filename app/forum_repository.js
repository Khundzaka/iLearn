var ForumPost = require("../models/forum_post");
var ForumTopic = require("../models/forum_topic");
var async = require("async");

var ForumRepository = {};

ForumRepository.topicList = function (callback) {
    ForumTopic.find({active: true}).exec(function (err, topics) {
        return callback(err, topics);
    });
};

ForumRepository.allTopicList = function (callback) {
    ForumTopic.find().exec(function (err, topics) {
        return callback(err, topics);
    });
};

ForumRepository.createTopic = function (params, callback) {
    var topic = new ForumTopic({title: params.title, description: params.description, active: params.active});
    topic.save(function (err) {
        return callback(err, topic);
    });
};

ForumRepository.updateTopic = function (params, callback) {
    ForumTopic.findById(params.uid).exec(function (err, topic) {
        if (err) {
            return callback(err);
        }
        topic.title = params.title;
        topic.description = params.description;
        topic.active = params.active;
        topic.save(function (err) {
            callback(err, topic);
        });
    });
};

ForumRepository.createPost = function (params, callback) {
    ForumTopic.findById(params.topicId).exec(function (err, topic) {
        if (err) {
            return callback(err);
        }
        var post = new ForumPost({text: params.text, topic: topic._id, user: params.user._id});
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

module.exports = {ForumRepository: ForumRepository};