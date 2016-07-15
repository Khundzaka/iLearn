var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Word = new Schema({
    description: String,
    value: String,
    author: {type: Schema.Types.ObjectId, ref: 'Account'},
    accepted: Boolean,
    checked: Boolean,
    created_at: Date,
    updated_at: Date
});

Word.pre('save', function (next) {
    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('Word', Word);