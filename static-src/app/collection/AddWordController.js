app.controller("AddWordController", ["$scope", "Collection", "WordService", "collectionId", "$uibModalInstance", "InfoModal",'$log',
    function ($scope, Collection, WordService, collectionId, $uibModalInstance, InfoModal,$log) {
        $scope.wordName = "";
        $scope.wordDescription = "";
        $scope.words = [];
        $scope.noWordsFound = false;
        //console.log(collectionId);
        $scope.findInput = "";
        $scope.addNewWord = function () {
            var valid = $scope.wordName != "" && $scope.wordDescription != "";
            if (valid) {
                Collection.addNewWord({
                    collectionId: collectionId,
                    wordName: $scope.wordName,
                    wordDescription: $scope.wordDescription
                }).then(function (data) {
                    $log.log(data);
                    $uibModalInstance.close();
                });
            }
            else {
                InfoModal.show({message: "შეავსეთ ყველა ველი"});
            }
        };

        $scope.addWord = function (wordId) {
            Collection.addWord({wordId: wordId, collectionId: collectionId}).then(function (data) {
                $log.log(data);
                $uibModalInstance.close();
            });
        };

        $scope.find = function () {
            WordService.find($scope.findInput).then(function (data) {
                $scope.words = data.words;
                // check words count
                $scope.noWordsFound = $scope.words.length == 0;
            });
        };

        $scope.close = function () {
            $uibModalInstance.close();
        }
    }
]);