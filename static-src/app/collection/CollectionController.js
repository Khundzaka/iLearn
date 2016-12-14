app.controller("CollectionController", ["$scope", "Collection", "$log",
    function ($scope, Collection, $log) {

        function fetchCollections(query) {
            Collection.getList({query: query}).then(function (data) {
                $scope.collections = data.collections;
                $log.log(data);
            });
        }

        fetchCollections("");

        $scope.find = function () {
            fetchCollections($scope.query);
        };
    }
]);