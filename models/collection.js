var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Collection = new Schema({
    name: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'Account'},
    words: [{type: Schema.Types.ObjectId, ref: 'Word'}],
    is_public: Boolean,
    featured: {type: Boolean, default: false},
    cost: {type: Number, default: 0},
    created_at: Date,
    updated_at: Date
});

Collection.pre('save', function (next) {
    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('Collection', Collection);