app.controller("ViewCollectionController", [
    "$scope", "Collection", "$stateParams", "$state", "AuthService", "$log", "$uibModal",
    function ($scope, Collection, $stateParams, $state, AuthService, $log, $uibModal) {
        Collection.getOne($stateParams.collection).then(function (data) {
            $scope.collection = data.collection;
            if (!$scope.collection.is_public && AuthService.uid != $scope.collection.author._id) {
                $state.go("collection.list");
            }
            $scope.getList = function (wordId) {

                $uibModal.open({
                    templateUrl: '/static/app/collection/my-private-collection-list.html',
                    controller: 'MyPrivateCollectionListController',
                    size: "md",
                    resolve: {
                        wordId: function () {
                            return wordId;
                        }
                    }
                });
            };
            // $log.log(data.collection);
        });
    }
]);