var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var Irregular = new Schema({
    form_one: String,
    form_two: String,
    form_three: String,
    description: String,
    created_at: Date,
    updated_at: Date
});

Irregular.pre('save', function (next) {
    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('Irregular', Irregular);