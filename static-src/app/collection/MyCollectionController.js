app.controller("MyCollectionController", ["$scope","Collection",
    function ($scope, Collection, AuthService) {
        Collection.getUserCollections().then(function (data) {
            $scope.collections = data.collections;
            console.log(data);
        });
        console.log("fuck");
    }
]);