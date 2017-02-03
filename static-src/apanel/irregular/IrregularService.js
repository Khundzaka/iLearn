apanelApp.factory("IrregularService", ['$http',
    function ($http) {
        var IrregularService = {};

        var IrregularApiEndpoint = "/apanel/api/irregular/";

        IrregularService.getIrregularList = function () {
            return $http.get(IrregularApiEndpoint+"list").then(function (resp) {
                return resp.data.data;
            });
        };

        IrregularService.getOne = function (IrregularId) {
            return $http.get(IrregularApiEndpoint +"one/"+ IrregularId).then(function (resp) {
                return resp.data.data;
            });
        };

        IrregularService.modify = function (params) {
            return $http.post(IrregularApiEndpoint + "modify", {
                uid: params.uid,
                form_one:params.form_one,
                form_two:params.form_two,
                form_three:params.form_three,
                description: params.description
            }).then(function (resp) {
                return resp.data.status;
            });
        };

        IrregularService.addNewIrregular = function (params) {
            return $http.post(IrregularApiEndpoint, {
                form_one:params.form_one,
                form_two:params.form_two,
                form_three:params.form_three,
                description:params.description,
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        return IrregularService;
    }
]);