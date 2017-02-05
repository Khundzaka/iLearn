app.controller("IrregularListController", ["$scope", "IrregularService", "$log",
    function ($scope, IrregularService, $log) {

        function fetchIrregularList() {
            IrregularService.getIrregularList().then(function (data) {
                $scope.irregulars = data.irregulars;
                $log.log(data);
            });
        }

        fetchIrregularList();
    }
]);