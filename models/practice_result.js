var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PracticeResult = new Schema({
    _collection: {type: Schema.Types.ObjectId, ref: 'Collection'},
    user: {type: Schema.Types.ObjectId, ref: 'Account'},
    created_at: Date,
    points: Number,
    coins: Number,
    correct: Number,
    wrong: Number,
    spent: Number,
    mistakes: [{
        word: {type: Schema.Types.ObjectId, ref: 'Word'},
        count: Number
    }]
});

PracticeResult.pre('save', function (next) {
    var currentDate = new Date();

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('PracticeResult', PracticeResult);