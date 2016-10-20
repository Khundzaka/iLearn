apanelApp.controller("AllCollectionListController", ["$scope", "CollectionService", "$uibModal", "$log",
    function ($scope, CollectionService, $uibModal, $log) {
        function fetchAllCollectionList() {
            CollectionService.getAllCollectionList().then(function (data) {
                $scope.collections = data.collections;
                $log.log(data);
            });
        }

        fetchAllCollectionList();

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
                fetchAllCollectionList();
            });

        };
    }
]);