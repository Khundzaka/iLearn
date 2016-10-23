app.controller('HeaderController', ["$scope", "$rootScope", "AuthService", "$state", "$log",
    function ($scope, $rootScope, AuthService, $state, $log) {
        $scope.authenticated = AuthService.authenticated;
        $scope.navCollapsed = true;
        $scope.$on('authentication', function () {
            $scope.authenticated = AuthService.authenticated;
        });

        $scope.logOut = function () {
            AuthService.logOut(function (status) {
                if (status) {
                    $state.go('app');
                    $scope.authenticated = AuthService.authenticated;
                }
            });
        };
    }]);