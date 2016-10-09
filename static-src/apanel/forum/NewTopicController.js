apanelApp.controller("NewTopicController",['$scope','ForumService','$log',
    function ($scope,ForumService,$log) {
        $scope.topicTitle='';
        $scope.topicDescription='';
        $scope.active=true;

        $scope.add=function () {
            ForumService.addNewTopic({
                title: $scope.topicTitle,
                description: $scope.topicDescription,
                active:$scope.active
            }).then(function (resp) {
                return resp.data.data;
            });
        };

    }
]);