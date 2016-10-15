apanelApp.factory("CollectionService", ['$http',
    function ($http) {
        var CollectionService = {};

        var CollectionApiEndpoint = "/apanel/api/collection/pending";
        var OneCollectionApiEndpoint="/api/collection/";

        CollectionService.getCollectionList = function () {
            return $http.get(CollectionApiEndpoint).then(function (resp) {
                return resp.data.data;
            });
        };

        CollectionService.getOne = function (CollectionId) {
            return $http.get(OneCollectionApiEndpoint + CollectionId).then(function (resp) {
                return resp.data.data;
            });
        };

        return CollectionService;
    }
]);