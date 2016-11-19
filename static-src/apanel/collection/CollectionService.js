apanelApp.factory("CollectionService", ['$http',
    function ($http) {
        var CollectionService = {};

        var CollectionApiEndpoint = "/apanel/api/collection/";
        var OneCollectionApiEndpoint="/api/collection/";

        CollectionService.getAllCollectionList = function (params) {
            params.limit = params.limit || 1;
            params.page = params.page || 1;
            return $http.get(CollectionApiEndpoint,{params: params}).then(function (resp) {
                return resp.data;
            });
        };

        CollectionService.getCollectionList = function () {
            return $http.get(CollectionApiEndpoint+"pending").then(function (resp) {
                return resp.data.data;
            });
        };

        CollectionService.getOne = function (CollectionId) {
            return $http.get(OneCollectionApiEndpoint + CollectionId).then(function (resp) {
                return resp.data.data;
            });
        };

        CollectionService.validate=function (params) {
            return $http.post(CollectionApiEndpoint + "validate", {
                uid: params.uid,
                accepted: params.accepted,
                name:params.name,
                description:params.description
            }).then(function (resp) {
                return resp.data.status;
            });
        }

        return CollectionService;
    }
]);