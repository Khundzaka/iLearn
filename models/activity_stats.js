var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActivityStats = new Schema({
    name: String,
    user: {type: Schema.Types.ObjectId, ref: 'Account'},
    verified: Boolean,
    created_at: Date,
    points: Number
});

ActivityStats.pre('save', function (next) {
    var currentDate = new Date();

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('ActivityStats', ActivityStats);