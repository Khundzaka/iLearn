app.controller('TopicController', ['$scope', '$uibModal', '$log', '$stateParams', 'Forum',
    function ($scope, $uibModal, $log, $stateParams, Forum) {
        $scope.newPostText = "";
        $scope.posts = [];
        // $scope.topics = [{
        //     "_id": "123",
        //     "title": "კითხვები ადმინისტრატორთან",
        //     "description": "აქ შეგიძლიათ დასვათ ნებისმიერი კითხვა და ადმინისტრაცია გაგცემთ პასუხს"
        // }, {
        //     "_id": "456",
        //     "title": "ტექნიკური ხარვეზები",
        //     "description": "თუ რაიმე პრობლემა შეგემნათ სერვისითსარგებლობისას, დაწერეთ აქ"
        // }
        // ];
        function fetchTopic() {
            Forum.getOneTopic({topicId: $stateParams.topicId}).then(function (data) {
                $scope.topic = data.topic;
                $log.log(data);
            })

        }

        fetchTopic();

        function fetchPosts() {
            Forum.getTopicPosts({topicId: $stateParams.topicId}).then(function (data) {
               $scope.posts=data.posts;
            });
        }

        fetchPosts();

        $scope.createPost = function () {
            Forum.createPost({text: $scope.newPostText, topicId: $stateParams.topicId}).then(function () {
                $scope.newPostText = "";
                fetchPosts();
            });
        };


        // $log.log($stateParams.topicId);
        // $log.log("watafaq");
        // $scope.posts = [
        //     {
        //         author: "jemali",
        //         text: "klaviatura kompiuters sad aqvs?",
        //         date: new Date()
        //     },
        //     {
        //         author: "nodari",
        //         text: "kompiuters adiela rom gadavafaro da uknidan shevubero, interneti achqardeba?",
        //         date: new Date()
        //     }
        // ]
    }
]);