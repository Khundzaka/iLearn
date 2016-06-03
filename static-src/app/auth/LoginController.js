app.controller("LoginController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
        $scope.username = "";
        $scope.password = "";

        $scope.loginSubmit = function () {
            AuthService.logIn($scope.username, $scope.password, function (success) {
                if (success) {
                    $rootScope.$broadcast('authentication', 'login');
                    $location.path("/");
                }
            });
        }
    }
]);