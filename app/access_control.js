var Group = require("../models/group");
var Permission = require("../models/permission");
var Account = require("../models/account");
var AccessControl = {};


AccessControl.getUsersList = function (callback) {
    Account.find({})
        .select({"_id": 1, "local.email": 1})
        .exec(function (err, users) {
            callback(err, users);
        });
};

AccessControl.getGroupsList = function (callback) {
    Group.find({}).select({"_id": 1, name: 1}).exec(function (err, groups) {
        callback(err, groups);
    });
};

AccessControl.getPermissionsList = function (callback) {
    Permission.find({}).select({"_id": 1, name: 1}).exec(function (err, permissions) {
        callback(err, permissions);
    });
};

AccessControl.getSingleUser = function (params, callback) {
    Account.findById(params.userId).exec(function (err, user) {
        if (err !== null) {
            callback(err);
        } else {
            AccessControl.getGroupsList(function (err, groups) {
                if (err !== null) {
                    callback(err);
                } else {
                    callback(null, {user: user, groups: groups});
                }
            });
        }
    });
};

AccessControl.getSingleGroup = function (params, callback) {
    Group.findById(params.groupId).exec(function (err, group) {
        if (err !== null) {
            callback(err);
        } else {
            AccessControl.getPermissionsList(function (err, permissions) {
                if (err !== null) {
                    callback(err);
                } else {
                    callback(null, {group: group, permissions: permissions});
                }
            });
        }
    });
};

AccessControl.getSinglePermission = function (params, callback) {
    Permission.findById(params.permissionId).exec(function (err, permission) {
        callback(err, {permission: permission});
    });
};

AccessControl.createGroup = function (params, callback) {
    var group = new Group();
    group.name = params.name;
    group.save(function (err) {
        callback(err, group);
    });
};

AccessControl.createPermission = function (params, callback) {
    var permission = new Permission();
    permission.name = params.name;
    permission._id = params.key;
    permission.save(function (err) {
        callback(err, permission);
    });
};

AccessControl.updateGroup = function (params, callback) {
    Group.findById(params.groupId).exec(function (err, group) {
        if (err !== null) {
            callback(err);
        } else {
            group.name = params.name;
            group.save(function (err) {
                callback(err, group);
            });
        }
    });
};

AccessControl.updatePermission = function (params, callback) {
    Permission.findById(params.permissionId).exec(function (err, permission) {
        if (err !== null) {
            callback(err);
        } else {
            permission.name = params.name;
            permission.save(function (err) {
                callback(err, permission);
            });
        }
    });

};

AccessControl.togglePermissionOfGroup = function (params, callback) {
    Group.findById(params.groupId).exec(function (err, group) {
        if (err !== null) {
            callback(err);
        } else {
            Permission.findById(params.permissionId).exec(function (err, permission) {
                if (err !== null) {
                    callback(err);
                } else {
                    if (typeof group.permissions === "undefined")group.permissions = [];
                    var operation = params.operation;
                    if (operation === "add") {
                        if (group.permissions.indexOf(permission._id) >= 0) {
                            callback(null);
                        } else {
                            group.permissions.push(permission._id);
                            group.save(function (err) {
                                callback(err);
                            });
                        }
                    }
                    else if (operation === "remove") {
                        var indexOfPermission = group.permissions.indexOf(permission._id);
                        if (indexOfPermission >= 0) {
                            group.permissions.splice(indexOfPermission, 1);
                            group.save(function (err) {
                                callback(err);
                            });
                        } else {
                            callback(null);
                        }
                    }
                    else {
                        callback(new Error("Unsupported operation"));
                    }
                }
            });
        }
    });
};


AccessControl.toggleGroupOfUser = function (params, callback) {
    Account.findById(params.userId).exec(function (err, user) {
        if (err !== null) {
            callback(err);
        } else {
            Group.findById(params.groupId).exec(function (err, group) {
                if (err !== null) {
                    callback(err);
                } else {
                    if (typeof user.groups === "undefined")user.groups = [];
                    var operation = params.operation;
                    if (operation === "add") {
                        if (user.groups.indexOf(group._id) >= 0) {
                            callback(null);
                        } else {
                            user.groups.push(group._id);
                            user.save(function (err) {
                                callback(err);
                            });
                        }
                    }
                    else if (operation === "remove") {
                        var indexOfGroup = user.groups.indexOf(group._id);
                        if (indexOfGroup >= 0) {
                            user.groups.splice(indexOfGroup, 1);
                            user.save(function (err) {
                                callback(err);
                            });
                        } else {
                            callback(null);
                        }
                    }
                    else {
                        callback(new Error("Unsupported operation"));
                    }
                }
            });
        }
    });
};
module.exports = AccessControl;