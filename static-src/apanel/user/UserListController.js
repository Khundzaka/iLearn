apanelApp.controller("UserListController",["$scope", "UserService", "$uibModal", "$log",
    function ($scope, UserService, $uibModal, $log) {
        function fetchUsersList() {
            UserService.getUsersList().then(function (data) {
                $scope.users = data.users;
                $log.log(data);
            });
        }

        fetchUsersList();

    }
]);