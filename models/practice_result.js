var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PracticeResult = new Schema({
    collection: {type: Schema.Types.ObjectId, ref: 'Collection'},
    user: {type: Schema.Types.ObjectId, ref: 'Account'},
    created_at: Date,
    points: Number,
    coins: Number,
    mistakes: [{type: Schema.Types.ObjectId, ref: 'Word'}]
});

PracticeResult.pre('save', function (next) {
    var currentDate = new Date();

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('PracticeResult', PracticeResult);