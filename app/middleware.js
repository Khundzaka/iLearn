function requiresPermission(permissionKey) {
    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            console.log("not authenticated");
            res.sendStatus(403);
        }
        else {
            req.user.loadPermissions(function () {
                // console.log(req.user.permissions);
                if (req.user.hasPermission(permissionKey)) {
                    next();
                }
                else {
                    console.log("not permitted");
                    res.sendStatus(403);
                }
            });
        }
    };
}

module.exports = {requiresPermission: requiresPermission};