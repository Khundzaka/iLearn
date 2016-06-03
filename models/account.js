var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');
var Group = require("./group");

var Account = new Schema({
    local: {
        username: String,
        email: String,
        password: {type: String, select: false}
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
    points: {type: Number, default: 0}
});

// generating a hash
Account.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
Account.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

Account.methods.loadPermissions = function (callback) {
    if (typeof this.permissions === 'undefined') {
        var that = this;
        Group.where("_id").in(that.groups).exec(function (err, groups) {
            if (!err) {
                var permissions = [];
                for (var i = 0; i < groups.length; i++) {
                    permissions = permissions.concat(groups[i].permissions);
                }
                that.permissions = _.uniq(permissions);
            } else {
                that.permissions = [];
            }
            callback(that.permissions);
        });
    } else {
        callback(this.permissions);
    }
};

Account.methods.hasPermission = function (permissionKey) {
    if (typeof this.permissions === 'undefined') {
        return false;
    } else {
        return this.permissions.indexOf(permissionKey) >= 0;
    }
};


module.exports = mongoose.model('Account', Account);