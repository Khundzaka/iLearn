apanelApp.controller("ForumController", ["$scope","ForumService","$log",
    function ($scope,ForumService,$log) {
        ForumService.getList().then(function (data) {
            $scope.topics = data.topics;
            $log.log(data);
        });
        $log.log("fuck");
    }
]);