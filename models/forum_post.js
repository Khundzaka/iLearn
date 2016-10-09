var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ForumPost = new Schema({
    text: String,
    user: {type: Schema.Types.ObjectId, ref: 'Account'},
    topic: {type: Schema.Types.ObjectId, ref: 'ForumTopic'},
    created_at: Date
});

ForumPost.pre('save', function (next) {
    var currentDate = new Date();

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('ForumPost', ForumPost);