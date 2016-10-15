apanelApp.controller("ModifyCollectionController", ["$scope", "$stateParams", "$uibModal", "Collection", "$state", "AuthService","$log",
    function ($scope, $stateParams, $uibModal, Collection, $state, AuthService,$log) {
        $log.log($stateParams.collection);
        $scope.collectionTypeText = "";

        function fetchCollection() {
            CollectionService.getOne($stateParams.collection).then(function (data) {
                if(data.collection.author._id != AuthService.uid){
                    $state.go("collection.list");
                    // console.log(data.collection.author._id);
                    // console.log(AuthService.uid);
                }
                // console.log(data.collection.author._id);
                // console.log(AuthService.uid);
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
