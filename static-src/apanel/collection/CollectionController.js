apanelApp.controller("CollectionController", ["$scope", "ForumService", "$uibModal", "CollectionService", "$log",
    function ($scope, ForumService, $uibModal, CollectionService, $log) {

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
                templateUrl: '/static/apanel/forum/modify-collection.html',
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