app.controller('ForumIndexController', ['$scope', '$uibModal', '$state', 'Forum', '$log',
    function ($scope, $uibModal, $state, Forum, $log) {
        // $scope.topics = [{
        //
        //     "title": "კითხვები ადმინისტრატორთან",
        //     "description": "აქ შეგიძლიათ დასვათ ნებისმიერი კითხვა და ადმინისტრაცია გაგცემთ პასუხს"
        // }, {
        //
        //     "title": "ტექნიკური ხარვეზები",
        //     "description": "თუ რაიმე პრობლემა შეგემნათ სერვისითსარგებლობისას, დაწერეთ აქ"
        // }
        //
        // ];
        //
        $scope.view = function (topicId) {
            $state.go("forum.topic", {topicId: topicId});
        }
        function fetchTopicList() {
            Forum.getTopicList().then(function (data) {
                $scope.topics = data.topics;
            });
        }
        fetchTopicList();

    }
]);