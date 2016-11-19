app.controller("CreateCollectionController", ["$scope", "Collection", "$state", "InfoModal",
    function ($scope, Collection, $state, InfoModal) {
        $scope.collectionType = 'private';
        $scope.collectionName = '';
        $scope.collectionDescription = '';

        $scope.submit = function () {
            var isPublic = $scope.collectionType === "public";
            if ($scope.collectionName == '') {
                InfoModal.show({title: "შეცდომა", message: "გთხოვთ შეავსოთ კოლექციის სახელი"});
                return;
            } else if ($scope.collectionDescription == '') {
                InfoModal.show({title: "შეცდომა", message: "გთხოვთ შეავსოთ კოლექციის აღწერა"});
                return;
            }
            Collection.create({
                isPublic: isPublic,
                name: $scope.collectionName,
                description: $scope.collectionDescription
            }).then(function (data) {
                var collectionId = data.id;
                $state.go('collection.edit', {collection: collectionId});
            });
        };


    }
]);