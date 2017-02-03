apanelApp.controller("IrregularListController", ["$scope", "IrregularService", "$uibModal", "$log",
    function ($scope, IrregularService, $uibModal, $log) {

        function fetchIrregularList() {
            IrregularService.getIrregularList().then(function (data) {
                $scope.irregulars = data.irregulars;
                $log.log(data);
            });
        }

        fetchIrregularList();

        $scope.modify = function (irregular_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/irregular/modify-irregular.html',
                controller: 'ModifyIrregularController',
                size: "lg",
                resolve: {
                    irregular_id: function () {
                        return irregular_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                fetchIrregularList();
            });

        };
    }
]);