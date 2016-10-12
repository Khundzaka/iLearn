apanelApp.controller("ForumController", ["$scope","ForumService","$uibModal","$log",
    function ($scope,ForumService,$uibModal,$log) {
        ForumService.getTopicList().then(function (data) {
            $scope.topics = data.topics;
            $log.log(data);
        });
        $log.log("fuck");

        $scope.modify = function (topic_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/forum/edit-topic.html',
                controller: 'EditTopicController',
                size: "lg",
                resolve: {
                    topic_id: function () {
                        return topic_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                getTopicList();
            });

        };
    }
]);