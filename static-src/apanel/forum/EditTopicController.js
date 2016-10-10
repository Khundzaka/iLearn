apanelApp.controller("EditTopicController",["$scope","ForumService","topic_id","$uibModalInstance","$log",
    function ($scope,ForumService,topic_id,$uibModalInstance,$log) {
        $scope.topicTitle = "";
        $scope.topicDescription = "";
        $scope.editTopic = function () {
            ForumService.update({
                title: $scope.topicTitle,
                description: $scope.topicDescription,
                uid: topic_id
            }).then(function () {
                $uibModalInstance.close();
            });
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $log.log(topic_id);

        };
    }
])