apanelApp.factory("UserService", ['$http',
    function ($http) {
        var UserService = {};

        var UserApiEndpoint = "/apanel/api/users";

        UserService.getUsersList = function () {
            return $http.get(UserApiEndpoint).then(function (resp) {
                return resp.data.data;
            });
        };

        return UserService;
    }
]);