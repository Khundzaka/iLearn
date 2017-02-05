app.factory("IrregularService", ['$http',
    function ($http) {
        var IrregularService = {};

        var IrregularApiEndpoint = "/apanel/api/irregular/";

        IrregularService.getIrregularList = function () {
            return $http.get(IrregularApiEndpoint+"list").then(function (resp) {
                return resp.data.data;
            });
        };

        return IrregularService;
    }
]);