app.controller("RegisterController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
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
                    $location.path("/");
                }
            });
        }
    }
]);