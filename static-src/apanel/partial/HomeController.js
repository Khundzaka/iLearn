apanelApp.controller('HomeController', ["$scope", "StatsService",
    function ($scope, StatsService) {
        StatsService.summary().then(function (data) {
            $scope.stats = data;
        });
    }
]);