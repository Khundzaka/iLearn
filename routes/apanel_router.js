var Router = require("express").Router;
var AccessControl = require("../app/access_control");
var requiresPermission = require("../app/middleware").requiresPermission;
var apanelWordRouter = require("./apanel/apanel_word_router");
var apanelForumRouter = require("./apanel/apanel_forum_router");
var apanelCollectionRouter = require("./apanel/apanel_collection_router");
var apanelUserRouter = require("./apanel/apanel_user_router");
var apanelStatsRouter = require("./apanel/apanel_stats_router");
var apanelIrregularRouter=require("./apanel/apanel_irregular_router");

var apanelRouter = Router();

var defaultFailResponse = {status: "failed"};
apanelRouter.use(requiresPermission('access_admin_panel'));

apanelRouter.get("/", function (req, res) {
    res.render("apanel", {});
});

apanelRouter.get("/api/user/", function (req, res) {
    AccessControl.getUsersList(function (err, users) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok", data: {users: users}});
        }
    });
});

apanelRouter.get("/api/user/:user", function (req, res) {
    AccessControl.getSingleUser({userId: req.params.user}, function (err, data) {
        if (err) {
            console.log(err);
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok", data: data});
        }
    });
});

apanelRouter.post("/api/user/group", function (req, res) {
    AccessControl.toggleGroupOfUser(req.body, function (err) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok"});
        }
    });
});

apanelRouter.get("/api/group/", function (req, res) {
    AccessControl.getGroupsList(function (err, groups) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok", data: {groups: groups}});
        }
    });
});

apanelRouter.post("/api/group/", function (req, res) {
    AccessControl.createGroup(req.body, function (err, group) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok"});
        }
    });
});

apanelRouter.put("/api/group/", function (req, res) {
    AccessControl.updateGroup(req.body, function (err, group) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok"});
        }
    });
});

apanelRouter.get("/api/group/:group", function (req, res) {
    AccessControl.getSingleGroup({groupId: req.params.group}, function (err, data) {
        if (err) {
            console.log(err);
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok", data: data});
        }
    });
});

apanelRouter.post("/api/group/permission", function (req, res) {
    AccessControl.togglePermissionOfGroup(req.body, function (err) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok"});
        }
    });
});

apanelRouter.get("/api/permission/", function (req, res) {
    AccessControl.getPermissionsList(function (err, permissions) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok", data: {permissions: permissions}});
        }
    });
});

apanelRouter.post("/api/permission/", function (req, res) {
    AccessControl.createPermission(req.body, function (err, permission) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok"});
        }
    });
});

apanelRouter.get("/api/permission/:permission", function (req, res) {
    AccessControl.getSinglePermission({permissionId: req.params.permission}, function (err, data) {
        if (err) {
            console.log(err);
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok", data: data});
        }
    });
});

apanelRouter.put("/api/permission/", function (req, res) {
    AccessControl.updatePermission(req.body, function (err, permission) {
        if (err) {
            res.json(defaultFailResponse);
        } else {
            res.json({status: "ok"});
        }
    });
});

apanelRouter.use("/api/word", apanelWordRouter);
apanelRouter.use("/api/forum", apanelForumRouter);
apanelRouter.use("/api/collection", apanelCollectionRouter);
apanelRouter.use("/api/users", apanelUserRouter);
apanelRouter.use("/api/stats", apanelStatsRouter);
apanelRouter.use("/api/irregular",apanelIrregularRouter);

module.exports = apanelRouter;