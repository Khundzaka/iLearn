apanelApp.controller("ModifyCollectionController", ["$scope", "$uibModalInstance", "CollectionService","collection_id","$log",
    function ($scope, $uibModalInstance, CollectionService,collection_id ,$log) {
        $scope.collectionTypeText = "";
        $scope.active="";

        function fetchCollection() {
            CollectionService.getOne(collection_id).then(function (data) {
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionTypeText = data.collection.is_public ? "ღია კოლექცია" : "პირადი კოლექცია";
                $scope.active=data.collection.accepted?"ვალიდური":"არა ვალიდური";
                $log.log(data.collection);
            });
        }

        fetchCollection();

        $scope.editCollection=function () {
            CollectionService.validate({
                uid: collection_id,
                name: $scope.collectionName,
                description: $scope.collectionDescription,
                accepted:$scope.active
            }).then(function () {
                $uibModalInstance.close();
            });
        };
        // $scope.approve = function (CollectionId) {
        //     CollectionService.validate({uid: CollectionId, accepted:true}).then(function (data) {
        //         fetchCollection();
        //     });
        // };
        //
        // $scope.reject = function (CollectionId) {
        //     CollectionService.validate({uid: CollectionId, accepted:false}).then(function (data) {
        //         fetchCollection();
        //     });
        // };

        $scope.close = function () {
            $uibModalInstance.close();
        };


    }
]);
