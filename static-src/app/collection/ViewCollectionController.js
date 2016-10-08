app.controller("ViewCollectionController", ["$scope", "Collection", "$stateParams","$log",
    function ($scope, Collection, $stateParams,$log) {
        Collection.getOne($stateParams.collection).then(function (data) {
            $scope.collection = data.collection;
            $log.log(data.collection);
        });
    }
]);