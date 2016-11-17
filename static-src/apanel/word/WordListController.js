apanelApp.controller("WordListController", ["$scope", "$uibModal", "WordService", "$stateParams", "$state",
    function ($scope, $uibModal, WordService, $stateParams, $state) {

        $scope.limit = 50;
        $scope.count = 0;

        function fetchList() {
            WordService.list({
                limit: $scope.limit,
                page: $stateParams.page
            }).then(function (data) {
                $scope.words = data.words;
                $scope.count = data.count;
                $scope.page = $stateParams.page;
            });
        }

        fetchList();

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
                fetchList();
            });
        };

        $scope.changePage = function () {
            $state.go(".", {page: $scope.page});
        };
    }
]);