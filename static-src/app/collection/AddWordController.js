app.controller("AddWordController", ["$scope", "Collection", "WordService", "collectionId", "$uibModalInstance",
    function ($scope, Collection, WordService, collectionId, $uibModalInstance) {
        //console.log(collectionId);
        $scope.findInput = "";
        $scope.addNewWord = function () {
            Collection.addNewWord({
                collectionId: collectionId,
                wordName: $scope.wordName,
                wordDescription: $scope.wordDescription
            }).then(function (data) {
                console.log(data);
                $uibModalInstance.close();
            });
        };

        $scope.addWord = function (wordId) {
            Collection.addWord({wordId: wordId, collectionId: collectionId}).then(function (data) {
                console.log(data);
                $uibModalInstance.close();
            });
        };

        $scope.find = function () {
            WordService.find($scope.findInput).then(function (data) {
                $scope.words = data.words;
            });
        };
    }
]);