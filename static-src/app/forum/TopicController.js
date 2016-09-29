app.controller('TopicController', ['$scope', '$uibModal', '$log',
    function ($scope, $uibModal, $log) {
        $scope.topics = [{
            "_id": "123",
            "title": "კითხვები ადმინისტრატორთან",
            "description": "აქ შეგიძლიათ დასვათ ნებისმიერი კითხვა და ადმინისტრაცია გაგცემთ პასუხს"
        }, {
            "_id": "456",
            "title": "ტექნიკური ხარვეზები",
            "description": "თუ რაიმე პრობლემა შეგემნათ სერვისითსარგებლობისას, დაწერეთ აქ"
        }
        ];
        $scope.posts = [
            {
                author: "jemali",
                text: "klaviatura kompiuters sad aqvs?",
                date: new Date()
            },
            {
                author: "nodari",
                text: "kompiuters adiela rom gadavafaro da uknidan shevubero, interneti achqardeba?",
                date: new Date()
            }
        ]
    }
]);