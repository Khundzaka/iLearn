app.controller("MyPrivateCollectionListController",
    ["$scope", "Collection","$log","WordService","wordId","$uibModal","$uibModalInstance",
    function ($scope, Collection, $log,WordService,wordId,$uibModal,$uibModalInstance) {
        function fetchMyPrivateCollectionList() {
            Collection.getUserCollections().then(function (data) {
                $scope.collections = data.collections.filter(function(el){return el.is_public===false});
                $log.log(data);
            });
        }

        fetchMyPrivateCollectionList();

        $scope.addWord = function (collectionId) {
            Collection.addWord({wordId: wordId, collectionId: collectionId}).then(function (data) {
                $log.log(data);
                $uibModal.open({
                    animation: true,
                    templateUrl: '/static/app/collection/confirmation.html',
                    size: "sm"
                });
                $uibModalInstance.close();
            })
        }
    }
]);
