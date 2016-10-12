apanelApp.controller("NewTopicController",['$scope','ForumService','$state','$log',
    function ($scope,ForumService,$state,$log) {
        $scope.topicTitle='';
        $scope.topicDescription='';
        $scope.active;

        $scope.submit = function () {
            ForumService.addNewTopic({
                title: $scope.topicTitle,
                description: $scope.topicDescription,
                active:$scope.active
            })
        };

    }
]);