var mongoose = require("mongoose");
var async = require("async");
var Account = require('../models/account');
var Permission = require('../models/permission');
var Group = require('../models/group');

var DefaultSeeder = {};

DefaultSeeder.seedPermissions = function (callback) {
    var permissions = [
        {_id: "access_admin_panel", name: "access admin panel"}
    ];

    var permission_id_list = [];

    async.each(permissions, function (permission, cb) {
        var perm = new Permission(permission);
        perm.save(function (err) {
            if (!err) {
                permission_id_list.push(perm._id);
            }
            cb(err);
        })
    }, function (err) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, permission_id_list);
    });
};

DefaultSeeder.seedGroups = function (params, callback) {
    var groups = [
        {name: "admin", permissions: params}
    ];

    var group_id_list = [];

    async.each(groups, function (group, cb) {
        var grp = new Group(group);
        grp.save(function (err) {
            if (!err) {
                group_id_list.push(grp._id);
            }
            cb(err);
        })
    }, function (err) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, {groups: group_id_list});
    });
};

DefaultSeeder.seedUsers = function (params, callback) {
    var user = new Account();
    user.local = {
        username: "testing",
        email: "test@example.com",
        password: user.generateHash("paroli")
    };
    user.points = 0;

    user.groups = params.groups;

    user.save(function (err) {
        console.log(callback);
        callback(err, user);
    });
};

DefaultSeeder.exec = function (callback) {
    mongoose.connect('mongodb://localhost/learn_iti', function (err) {
        if (!err) {
            DefaultSeeder.seedPermissions(function (err, permissions) {

                DefaultSeeder.seedGroups(permissions, function (err, groups) {

                    DefaultSeeder.seedUsers(groups, function (err, users) {
                        callback(err, users);
                        mongoose.connection.close();
                    });
                });
            });
        }
        else {
            callback(err);
        }
    });
};

module.exports = DefaultSeeder;