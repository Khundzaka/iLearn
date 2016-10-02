app.controller("LoginController", ['$scope', 'AuthService', '$state', '$rootScope', 'InfoModal',
    function ($scope, AuthService, $state, $rootScope, InfoModal) {
        $scope.email = "";
        $scope.password = "";

        $scope.loginSubmit = function () {
            AuthService.logIn($scope.email, $scope.password, function (error) {
                if (!error) {
                    $rootScope.$broadcast('authentication', 'login');
                    $state.go("dashboard.profile");
                }
                else {
                    InfoModal.show({message: "ელ.ფოსტა ან პაროლი არასწორია"});
                }
            });
        }
    }
]);