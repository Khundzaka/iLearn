var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');

var Permission = new Schema({
    _id: String,
    name: String
});

module.exports = mongoose.model('Permission', Permission);