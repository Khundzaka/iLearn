var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Permission = new Schema({
    _id: String,
    name: String
});

module.exports = mongoose.model('Permission', Permission);