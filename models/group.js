var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');

var Group = new Schema({
    name: String,
    permissions: [{type: String, ref: 'Permission'}]
});

module.exports = mongoose.model('Group', Group);