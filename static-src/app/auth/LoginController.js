app.controller("LoginController", ['$scope', 'AuthService', '$state', '$rootScope',
    function ($scope, AuthService, $state, $rootScope) {
        $scope.username = "";
        $scope.password = "";

        $scope.loginSubmit = function () {
            AuthService.logIn($scope.username, $scope.password, function (success) {
                if (success) {
                    $rootScope.$broadcast('authentication', 'login');
                    $state.go("dashboard.profile");
                }
            });
        }
    }
]);