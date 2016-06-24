app.service("InfoModal", ["$uibModal", function ($uibModal) {
    return {
        show: function (passedData) {
            var message = passedData.message || "";
            var title = passedData.title || false;
            var size = passedData.size || "sm";

            $uibModal.open({
                animation: true,
                templateUrl: '/static/app/services/info-modal.html',
                controller: ["$scope", "passedObject", "$uibModalInstance",
                    function ($scope, passedObject, $uibModalInstance) {
                        $scope.message = passedObject.message;
                        $scope.title = passedObject.title;
                        $scope.close = function () {
                            $uibModalInstance.close();
                        }
                    }
                ],
                size: size,
                resolve: {
                    passedObject: function () {
                        return {message: message, title: title};
                    }
                }
            });
        }
    };
}]);