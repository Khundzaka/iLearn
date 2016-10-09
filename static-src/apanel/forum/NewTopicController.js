apanelApp.controller("NewTopicController",['$scope','ForumService','$state','$log',
    function ($scope,ForumService,$state,$log) {
        $scope.topicTitle='';
        $scope.topicDescription='';


        $scope.submit = function () {
            var active = true;
            if (active) {
                ForumService.addNewTopic({
                    title: $scope.topicTitle,
                    description: $scope.topicDescription,
                })
            }
        };

    }
]);