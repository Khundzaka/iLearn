app.controller("ProfileController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
        console.log(AuthService);
        $scope.hasFacebook = AuthService.facebook.name !== null;
        $scope.hasLocal = AuthService.local.email !== null;
        $scope.facebookName = AuthService.facebook.name;
        $scope.localEmail = AuthService.local.email;
        $scope.localUserName = AuthService.local.username;
    }
]);