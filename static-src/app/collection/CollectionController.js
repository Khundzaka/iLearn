app.controller("CollectionController", ["$scope","Collection","$log",
    function ($scope, Collection,$log) {
        Collection.getList().then(function (data) {
            $scope.collections = data.collections;
            $log.log(data);
        });
        $log.log("fuck");
    }
]);