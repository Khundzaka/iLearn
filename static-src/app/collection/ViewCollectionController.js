app.controller("ViewCollectionController", ["$scope", "Collection", "$stateParams", "$state", "AuthService", "$log",
    function ($scope, Collection, $stateParams, $state,AuthService, $log) {
        Collection.getOne($stateParams.collection).then(function (data) {
            $scope.collection = data.collection;
            if (!$scope.collection.is_public && AuthService.uid != $scope.collection.author._id) {
                $state.go("collection.list");
            }
            // $log.log(data.collection);
        });
    }
]);