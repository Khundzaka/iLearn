app.controller("EditCollectionController", ["$scope", "$stateParams", "$uibModal", "Collection",
    function ($scope, $stateParams, $uibModal, Collection) {
        console.log($stateParams.collection);
        $scope.collectionTypeText = "";

        function fetchCollection() {
            Collection.getOne($stateParams.collection).then(function (data) {
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionTypeText = data.collection.is_public ? "ღია კოლექცია" : "პირადი კოლექცია";
                console.log(data.collection);
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
                console.log("Done");
                fetchCollection();
            });
        };

        $scope.removeWord = function (wordId) {
            Collection.removeWord({collectionId: $scope.collection._id, wordId: wordId}).then(function (data) {
                fetchCollection();
            });
        };

        $scope.update = function () {
            console.log("aris");
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