var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ForumTopic = new Schema({
    title: String,
    description: String,
    updated_at: Date,
    active: Boolean
});

ForumTopic.pre('save', function (next) {
    this.updated_at = new Date();

    next();
});

module.exports = mongoose.model('ForumTopic', ForumTopic);