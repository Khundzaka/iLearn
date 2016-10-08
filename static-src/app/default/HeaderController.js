app.controller('HeaderController', function ($scope, $rootScope, AuthService, $state,$log) {
    $scope.authenticated = AuthService.authenticated;
    $scope.navCollapsed = true;
    $scope.$on('authentication', function () {
        $scope.authenticated = AuthService.authenticated;
    });
    $scope.headerLinks = [
        {title: "მთავარი", state: "app", active: false},
        {title: "ფორუმი", state: "forum", active: false},
        {title: "კოლექციები", state: "collection.list", active: false}
    ];
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        //$log.log(toState);
        var i;
        for (i = 0; i < $scope.headerLinks.length; i++) {
            $scope.headerLinks[i].active = $scope.headerLinks[i].state === toState.name;
        }
    });

    $scope.goToState = function (state) {
        $scope.navCollapsed = true;
        $state.go(state);
    };

    $scope.logOut = function () {
        AuthService.logOut(function (status) {
            if (status) {
                $state.go('app');
                $scope.authenticated = AuthService.authenticated;
            }
        });
    };
});