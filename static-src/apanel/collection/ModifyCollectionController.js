apanelApp.controller("ModifyCollectionController", ["$scope", "$uibModalInstance", "CollectionService","collection_id","$log",
    function ($scope, $uibModalInstance, CollectionService,collection_id ,$log) {
        $scope.collectionTypeText = "";
        $scope.collectionIsValid="";

        function fetchCollection() {
            CollectionService.getOne(collection_id).then(function (data) {
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionTypeText = data.collection.is_public ? "ღია კოლექცია" : "პირადი კოლექცია";
                $scope.collectionIsValid=data.collection.accepted?"ვალიდური":"არა ვალიდური";
                $log.log(data.collection);
            });
        }

        fetchCollection();

        $scope.editCollection=function (collection_id) {
            CollectionService.getOne(collection_id).then(function (data) {
                $log.log(data);
                fetchCollection();
            })
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };


    }
]);
