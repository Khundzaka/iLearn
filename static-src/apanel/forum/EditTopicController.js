apanelApp.controller("EditTopicController",["$scope","ForumService","topic_id","$uibModal","$uibModalInstance","$log","$stateParams",
    function ($scope,ForumService,topic_id,$uibModal,$uibModalInstance,$log,$stateParams) {
        $scope.topicTitle = "";
        $scope.topicDescription = "";

        function fetchTopic() {
            ForumService.getOne(topic_id).then(function (data) {
                $log.log(data);
                $log.log(topic_id);
                $scope.topicTitle = data.topics.title;
                $scope.topicDescription = data.topics.description;
            });
        }

        fetchTopic();


        $scope.editTopic = function () {
            ForumService.update({
                title: $scope.topicTitle,
                description: $scope.topicDescription,
                uid: topic_id
            }).then(function () {
                fetchTopic();
            });

        };


    }
])