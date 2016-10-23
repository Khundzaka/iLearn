var Account = require("../models/account");

var UserRepository = {};

UserRepository.findAll = function (params, callback) {
    Account.find().exec().then(function (accounts) {
        return callback(null, accounts);
    }).catch(function (err) {
        return callback(err);
    });
};

module.exports = {UserRepository: UserRepository};