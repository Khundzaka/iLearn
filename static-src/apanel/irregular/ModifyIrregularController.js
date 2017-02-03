apanelApp.controller("ModifyIrregularController", ["$scope", "$uibModalInstance", "IrregularService", "irregular_id", "$log",
    function ($scope, $uibModalInstance, IrregularService, irregular_id, $log) {

        function fetchIrregular() {
            IrregularService.getOne(irregular_id).then(function (data) {
                $scope.irregular = data.irregular;
                $scope.form_one = data.irregular.form_one;
                $scope.form_two = data.irregular.form_two;
                $scope.form_three = data.irregular.form_three;
                $scope.description = data.irregular.description;
                $log.log(data.irregular);
            });
        }

        fetchIrregular();

        $scope.editIrregular = function () {
            IrregularService.modify({
                uid: irregular_id,
                form_one: $scope.form_one,
                form_two: $scope.form_two,
                form_three: $scope.form_three,
                description: $scope.description
            }).then(function () {
                $uibModalInstance.close();
            });
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };


    }
]);
