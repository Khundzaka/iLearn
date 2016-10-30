apanelApp.factory("StatsService", ['$http',
    function ($http) {
        var StatsService = {};

        var StatsApiEndpoint = "/apanel/api/stats";

        StatsService.summary = function () {
            return $http.get(StatsApiEndpoint + "/summary").then(function (resp) {
                return resp.data.data;
            });
        };

        return StatsService;
    }
]);