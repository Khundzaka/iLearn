apanelApp.controller("CollectionController", ["$scope", "$uibModal", "CollectionService", "$log",
    function ($scope, $uibModal, CollectionService, $log) {

        function fetchCollectionList() {
            CollectionService.getCollectionList().then(function (data) {
                $scope.collections = data.collections;
                $log.log(data);
            });
        }

        fetchCollectionList();

        $scope.modify = function (collection_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/collection/modify-collection.html',
                controller: 'ModifyCollectionController',
                size: "lg",
                resolve: {
                    collection_id: function () {
                        return collection_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                fetchCollectionList();
            });

        };
    }
]);