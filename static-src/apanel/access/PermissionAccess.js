apanelApp.factory("PermissionAccess", function ($http,$log) {
    var PermissionAccess = function () {

    };
    var permissionAccessEndpoint = "/apanel/api/permission/";

    PermissionAccess.getList = function () {
        return $http.get(permissionAccessEndpoint).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    PermissionAccess.getOne = function (permissionId) {
        return $http.get(permissionAccessEndpoint + permissionId).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    PermissionAccess.create = function (permission_name, permission_key) {
        return $http.post(permissionAccessEndpoint, {
            name: permission_name,
            key: permission_key
        }).then(function (response) {
            return response.data.status;
        });
    };

    PermissionAccess.update = function (permissionId, permissionName) {
        return $http.put(permissionAccessEndpoint, {
            permissionId: permissionId,
            name: permissionName
        }).then(function (response) {
            return response.data.status;
        });
    };

    return PermissionAccess;
});