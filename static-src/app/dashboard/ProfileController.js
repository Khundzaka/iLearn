app.controller("ProfileController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
        $scope.hasFacebook = AuthService.facebook.name !== null;
        $scope.facebookName = AuthService.facebook.name;
        console.log(AuthService.local);
        console.log("aaa");
        $scope.localEmail = AuthService.local.email;
        $scope.localUserName = AuthService.local.username;
    }
]);