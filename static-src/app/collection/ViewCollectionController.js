app.controller("ViewCollectionController", ["$scope", "Collection", "$stateParams",
    function ($scope, Collection, $stateParams) {
        Collection.getOne({user_id: $stateParams.collection}).then(function (data) {
            $scope.collection = data.collection;
            console.log(data.collection);
        });
    }
]);