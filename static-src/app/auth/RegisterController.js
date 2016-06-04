app.controller("RegisterController", ['$scope', 'AuthService', '$state', '$rootScope',
    function ($scope, AuthService, $state, $rootScope) {
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";

        $scope.register = function () {
            AuthService.register({
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            }, function (success) {
                if (success) {
                    $rootScope.$broadcast('authentication', 'login');
                    $state.go("dashboard.profile");
                }
            });
        }
    }
]);