apanelApp.controller("ModifyWordController", ["$scope", "WordService", "wordId", "$uibModalInstance",
    function ($scope, WordService, WordId, $uibModalInstance) {
        $scope.wordName = "";
        $scope.wordDescription = "";
        $scope.addNewWord = function () {
            var valid = $scope.wordName != "" && $scope.wordDescription != "";
            if (valid) {
                WordService.modify({
                    uid: WordId,
                    value: $scope.wordName,
                    description: $scope.wordDescription
                }).then(function () {
                    $uibModalInstance.close();
                });
            }
            else {
                alert("შეავსეთ ყველა ველი");
            }
        };

        function fetchWord() {
            WordService.one(WordId).then(function (data) {
                console.log(data);
                $scope.wordName = data.word.value;
                // check words count
                $scope.wordDescription = data.word.description;
            });
        }

        fetchWord();

        $scope.swap = function () {
            var tmp = $scope.wordDescription;
            $scope.wordDescription = $scope.wordName;
            $scope.wordName = tmp;
        };


        $scope.close = function () {
            $uibModalInstance.close();
        }
    }
]);