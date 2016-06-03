app.controller('HeaderController', function ($scope, $rootScope, AuthService, $state) {
    $scope.authenticated = AuthService.authenticated;
    $scope.$on('authentication', function () {
        $scope.authenticated = AuthService.authenticated;
    });
    $scope.headerLinks = [
        {title: "მთავარი", state: "app", active: false},
        {title: "როგორ მუშაობს", state: "how-it-works", active: false},
        {title: "კოლექციები", state: "collection.list", active: false}
    ];
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        //console.log(toState);
        var i;
        for (i = 0; i < $scope.headerLinks.length; i++) {
            $scope.headerLinks[i].active = $scope.headerLinks[i].state === toState.name;
        }
    });

    $scope.logOut = function () {
        AuthService.logOut(function (status) {
            if (status) {
                $state.go('app');
                $scope.authenticated = AuthService.authenticated;
            }
        });
    };
});