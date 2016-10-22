apanelApp.controller("ForumController", ["$scope", "ForumService", "$uibModal", "$log",
    function ($scope, ForumService, $uibModal, $log) {

        function fetchTopicList() {
            ForumService.getTopicList().then(function (data) {
                $scope.topics = data.topics;
            });
        }

        fetchTopicList();

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
                fetchTopicList();
            });

        };
    }
]);