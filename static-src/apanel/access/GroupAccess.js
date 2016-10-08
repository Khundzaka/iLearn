apanelApp.factory("GroupAccess", function ($http,$log) {
    var GroupAccess = function () {

    };
    var groupAccessEndpoint = "/apanel/api/group/";

    GroupAccess.getList = function () {
        return $http.get(groupAccessEndpoint).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    GroupAccess.getOne = function (groupId) {
        return $http.get(groupAccessEndpoint + groupId).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    GroupAccess.create = function (group_name) {
        return $http.post(groupAccessEndpoint, {
            name: group_name
        }).then(function (response) {
            return response.data.status;
        });
    };

    GroupAccess.update = function (groupId, groupName) {
        return $http.put(groupAccessEndpoint, {
            groupId: groupId,
            name: groupName
        }).then(function (response) {
            return response.data.status;
        });
    };

    GroupAccess.togglePermission = function (groupId, permissionId, operation) {
        return $http.post(groupAccessEndpoint + "permission/", {
            groupId: groupId,
            permissionId: permissionId,
            operation: operation
        }).then(function (response) {
            return response.data.status;
        });
    };

    return GroupAccess;
});