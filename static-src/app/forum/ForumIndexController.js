app.controller('ForumIndexController', ['$scope', '$uibModal', '$state',
    function ($scope, $uibModal, $state) {
        $scope.topics = [{

            "title": "კითხვები ადმინისტრატორთან",
            "description": "აქ შეგიძლიათ დასვათ ნებისმიერი კითხვა და ადმინისტრაცია გაგცემთ პასუხს"
        }, {

            "title": "ტექნიკური ხარვეზები",
            "description": "თუ რაიმე პრობლემა შეგემნათ სერვისითსარგებლობისას, დაწერეთ აქ"
        }

        ];
        //
        // $scope.view = function (topicId) {
        //     $state.go("forum.topic", {topicId: topicId});
        // }
    }
]);