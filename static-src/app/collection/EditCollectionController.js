app.controller("EditCollectionController", ["$scope", "$stateParams", "$uibModal", "Collection", "$state", "AuthService","$log",
    function ($scope, $stateParams, $uibModal, Collection, $state, AuthService,$log) {
        $log.log($stateParams.collection);
        $scope.collectionTypeText = "";

        function fetchCollection() {
            Collection.getOne($stateParams.collection).then(function (data) {
                if(data.collection.author._id != AuthService.uid){
                    $state.go("collection.list");
                    // console.log(data.collection.author._id);
                    // console.log(AuthService.uid);
                }
                // console.log(data.collection.author._id);
                // console.log(AuthService.uid);
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionTypeText = data.collection.is_public ? "ღია კოლექცია" : "პირადი კოლექცია";
                $log.log(data.collection);
            });
        }

        fetchCollection();

        $scope.addNewWord = function () {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/app/collection/add-word.html',
                controller: 'AddWordController',
                size: "lg",
                resolve: {
                    collectionId: function () {
                        return $stateParams.collection;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                fetchCollection();
            });
        };

        $scope.removeWord = function (wordId) {
            Collection.removeWord({collectionId: $scope.collection._id, wordId: wordId}).then(function (data) {
                fetchCollection();
            });
        };

        $scope.update = function () {
            $log.log("aris");
            Collection.update({
                collectionId: $stateParams.collection,
                name: $scope.collectionName,
                description: $scope.collectionDescription
            }).then(function (status) {
                fetchCollection();
            });
        };
    }
]);