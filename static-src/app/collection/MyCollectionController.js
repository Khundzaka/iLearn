app.controller("MyCollectionController", ["$scope","Collection","$log",
    function ($scope, Collection, AuthService,$log) {
        Collection.getUserCollections().then(function (data) {
            $scope.collections = data.collections;
            $log(data);
        });
        $log("fuck");
    }
]);