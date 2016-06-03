app.factory("WordService", ["$http",
    function ($http) {
        var wordPath = "/api/word/";
        var WordService = {};
        WordService.find = function (word) {
            return $http.post(wordPath + "find", {value: word}).then(function (resp) {
                return resp.data.data;
            });
        };

        return WordService;
    }
]);