apanelApp.controller("NewIrregularController",["$scope","IrregularService","$state",
    function ($scope,IrregularService,$state) {
        $scope.form_one='';
        $scope.form_two='';
        $scope.form_three='';
        $scope.description='';

        $scope.submit = function () {
            IrregularService.addNewIrregular({
                form_one:$scope.form_one,
                form_two:$scope.form_two,
                form_three:$scope.form_three,
                description:$scope.description
            }).then(function () {
               $state.go('app.irregular.irregular-list');
            })
        };

    }
]);