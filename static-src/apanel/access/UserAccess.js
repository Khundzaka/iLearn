apanelApp.factory("UserAccess", function ($http) {
    var UserAccess = function () {

    };
    var user_access_endp = "/apanel/api/user/";

    UserAccess.getList = function () {
        return $http.get(user_access_endp).then(function (response) {
            console.log(response);
            return response.data.data;
        });
    };

    UserAccess.getOne = function (params) {
        console.log(params);
        var userId = params.userId;
        return $http.get(user_access_endp + userId).then(function (response) {
            console.log(response);
            return response.data.data;
        });
    };

    UserAccess.toggleGroup = function (user_id, group_id, operation) {
        return $http.post(user_access_endp + "group/", {
            userId: user_id,
            groupId: group_id,
            operation: operation
        }).then(function (response) {
            return response.data.status;
        });
    };

    return UserAccess;
});