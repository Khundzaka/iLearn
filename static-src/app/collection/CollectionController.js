app.controller("CollectionController", ["$scope","Collection",
    function ($scope, Collection) {
        Collection.getList().then(function (data) {
            $scope.collections = data.collections;
            console.log(data);
        });
        console.log("fuck");
    }
]);