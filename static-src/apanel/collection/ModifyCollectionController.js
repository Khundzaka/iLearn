apanelApp.controller("ModifyCollectionController", ["$scope", "$stateParams", "$uibModal", "CollectionService", "$state","$log",
    function ($scope, $stateParams, $uibModal, CollectionService, $state, $log) {
        $log.log($stateParams.collection);
        $scope.collectionTypeText = "";

        function fetchCollection() {
            CollectionService.getOne($stateParams.collection).then(function (data) {
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionTypeText = data.collection.is_public ? "ღია კოლექცია" : "პირადი კოლექცია";
                $log.log(data.collection);
            });
        }

        fetchCollection();


    }
]);
