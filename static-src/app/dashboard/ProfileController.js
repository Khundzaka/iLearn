app.controller("ProfileController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
        console.log(AuthService);
        $scope.hasFacebook = AuthService.facebook.name !== null;
        // console.log($scope.hasFacebook);
        // console.log(AuthService.facebook.name);
        $scope.facebookName = AuthService.facebook.name;
        $scope.localEmail = AuthService.local.email;
        $scope.localUserName = AuthService.local.username;
    }
]);