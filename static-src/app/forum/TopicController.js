app.controller('TopicController', ['$scope', '$uibModal', '$log', '$stateParams', 'Forum', "InfoModal",'$state',
    function ($scope, $uibModal, $log, $stateParams, Forum, InfoModal,$state) {
        $scope.newPostText = "";
        $scope.posts = [];

        $scope.limit = 10;
        $scope.count = 0;

        function fetchTopic() {
            Forum.getOneTopic({topicId: $stateParams.topicId}).then(function (data) {
                $scope.topic = data.topic;
                $log.log(data);
            })

        }

        fetchTopic();

        function fetchPosts() {
            Forum.getTopicPosts({
                topicId: $stateParams.topicId,
                limit: $scope.limit,
                page: $stateParams.page
            }).then(function (data) {
                $scope.posts = data.posts;
                $scope.count = data.count.fulfillmentValue;
                $scope.page = $stateParams.page;
                $log.log(data.page);
            });
        }

        fetchPosts();

        $scope.changePage = function () {
            $state.go(".", {page: $scope.page});
        };



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