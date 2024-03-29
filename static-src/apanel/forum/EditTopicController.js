apanelApp.controller("EditTopicController", ["$scope", "ForumService", "topic_id", "$uibModalInstance", "$log",
    function ($scope, ForumService, topic_id, $uibModalInstance, $log) {
        $scope.topicTitle = "";
        $scope.topicDescription = "";
        $scope.active = null;

        function fetchTopic() {
            ForumService.getOne(topic_id).then(function (data) {
                $log.log(data);
                $scope.topicTitle = data.topic.title;
                $scope.topicDescription = data.topic.description;
            });
        }

        fetchTopic();


        $scope.editTopic = function () {
            ForumService.update({
                title: $scope.topicTitle,
                description: $scope.topicDescription,
                active: $scope.active,
                uid: topic_id
            }).then(function () {
                fetchTopic();
                $uibModalInstance.close();
            });

        };


    }
]);