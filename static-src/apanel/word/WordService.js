apanelApp.factory("WordService", ['$http',
    function ($http) {
        var WordService = {};

        var WordApiEndpoint = "/apanel/api/word/";

        WordService.pendingList = function () {
            return $http.get(WordApiEndpoint + "pending").then(function (resp) {
                return resp.data.data;
            });
        };

        WordService.one = function (wordId) {
            return $http.get(WordApiEndpoint + "one/" + wordId).then(function (resp) {
                return resp.data.data;
            });
        };

        WordService.validate = function (params) {
            return $http.post(WordApiEndpoint + "validate", {
                uid: params.uid,
                accepted: params.accepted
            }).then(function (resp) {
                return resp.data.status;
            });
        };

        WordService.modify = function (params) {
            return $http.post(WordApiEndpoint + "modify", {
                uid: params.uid,
                value: params.value,
                description: params.description
            }).then(function (resp) {
                return resp.data.status;
            });
        };
        return WordService;
    }
]);