apanelApp.controller("ForumController", ["$scope",
    function ($scope) {
        $scope.topics = [{
            "_id": "123",
            "title": "კითხვები ადმინისტრატორთან",
            "description": "აქ შეგიძლიათ დასვათ ნებისმიერი კითხვა და ადმინისტრაცია გაგცემთ პასუხს"
        }, {
            "_id": "456",
            "title": "ტექნიკური ხარვეზები",
            "description": "თუ რაიმე პრობლემა შეგემნათ სერვისით სარგებლობისას, დაწერეთ აქ"
        }

        ];

    }
]);