app.controller("CreateCollectionController", ["$scope", "Collection", "$state",
    function ($scope, Collection, $state) {
        $scope.collectionType = 'public';
        $scope.collectionName = '';
        $scope.collectionDescription = '';

        $scope.submit = function () {
            var isPublic = $scope.collectionType === "public";
            Collection.create({
                isPublic: isPublic,
                name: $scope.collectionName,
                description: $scope.collectionDescription
            }).then(function (data) {
                var collectionId = data.id;
                $state.go('collection.edit', {collection: collectionId});
                // console.log(collectionId);
            });
        };


    }
]);