apanelApp.controller('TopicController', ['$scope', '$uibModal', '$log', '$stateParams', 'ForumService',
    function ($scope, $uibModal, $log, $stateParams, ForumService) {
        $scope.posts = [];

        function fetchTopic() {
            ForumService.getOneTopic({topicId: $stateParams.topicId}).then(function (data) {
                $scope.topic = data.topic;
                $log.log(data);
            })

        }

        fetchTopic();

        function fetchPosts() {
            ForumService.getTopicPosts({topicId: $stateParams.topicId}).then(function (data) {
                $scope.posts = data.posts;
            });
        }

        fetchPosts();


        $scope.deletePost = function (post_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/forum/delete-post.html',
                controller: 'DeletePostConfirmationController',
                size: "md",
                resolve: {
                    post_id: function () {
                        return post_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                fetchPosts();
            });

        };
    }
]);