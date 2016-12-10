app.controller("MyPrivateCollectionListController", [
    "$scope", "Collection", "$log", "WordService", "wordId", "InfoModal", "$uibModalInstance",
    function ($scope, Collection, $log, WordService, wordId, InfoModal, $uibModalInstance) {
        function fetchMyPrivateCollectionList() {
            Collection.getUserCollections().then(function (data) {
                $scope.collections = data.collections.filter(function (el) {
                    return el.is_public === false
                });
                // $log.log(data);
            });
        }

        fetchMyPrivateCollectionList();

        $scope.addWord = function (collectionId) {
            Collection.addWord({wordId: wordId, collectionId: collectionId}).then(function (data) {
                // $log.log(data);
                InfoModal.show({message: "სიტყვა დამატებულია პირად კოლექციაში."});
                $uibModalInstance.close();
            });
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };
    }
]);
