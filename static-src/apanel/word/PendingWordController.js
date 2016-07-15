apanelApp.controller("PendingWordController", ["$scope", "$uibModal", "WordService", "$state",
    function ($scope, $uibModal, WordService, $state) {
        $scope.collectionTypeText = "";

        function fetchPending() {
            WordService.pendingList().then(function (data) {
                $scope.words = data.words;
            });
        }

        fetchPending();

        $scope.modify = function (wordId) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/word/modify-word.html',
                controller: 'ModifyWordController',
                size: "lg",
                resolve: {
                    wordId: function () {
                        return wordId;
                    }
                }
            });

            groupModal.result.then(function () {
                console.log("Done");
                fetchPending();
            });
        };

        $scope.approve = function (wordId) {
            WordService.validate({uid: wordId, accepted:true}).then(function (data) {
                fetchPending();
            });
        };

        $scope.reject = function (wordId) {
            WordService.validate({uid: wordId, accepted:false}).then(function (data) {
                fetchPending();
            });
        };
    }
]);