apanelApp.controller("AllCollectionListController", [
    "$scope", "CollectionService", "$uibModal", "$log", "$stateParams", "$state",
    function ($scope, CollectionService, $uibModal, $log, $stateParams, $state) {
        $scope.orderByField = 'created_at';
        $scope.reverseSort = true;
        $scope.limit = 20;
        $scope.count = 0;

        function fetchAllCollectionList() {
            CollectionService.getAllCollectionList({
                limit: $scope.limit,
                page: $stateParams.page
            }).then(function (data) {
                $scope.collections = data.collections;
                $scope.count = data.count;
                $scope.page = $stateParams.page;
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

        $scope.changePage = function () {
            $state.go(".", {page: $scope.page});
        };
    }
]);