app.controller('TopicController', ['$scope', '$uibModal', '$log', '$stateParams', 'Forum', "InfoModal",
    function ($scope, $uibModal, $log, $stateParams, Forum, InfoModal) {
        $scope.newPostText = "";
        $scope.posts = [];

        function fetchTopic() {
            Forum.getOneTopic({topicId: $stateParams.topicId}).then(function (data) {
                $scope.topic = data.topic;
                $log.log(data);
            })

        }

        fetchTopic();

        function fetchPosts() {
            Forum.getTopicPosts({topicId: $stateParams.topicId}).then(function (data) {
                $scope.posts = data.posts;
            });
        }

        fetchPosts();

        $scope.createPost = function () {
            if ($scope.newPostText.length < 10) {
                return InfoModal.show({message: "პოსტის ზომა უნდა იყოს მინიმუმ 10 სიმბოლო"});
            }
            Forum.createPost({text: $scope.newPostText, topicId: $stateParams.topicId}).then(function () {
                $scope.newPostText = "";
                fetchPosts();
            });
        };

    }
]);