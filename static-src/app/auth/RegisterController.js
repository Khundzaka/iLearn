app.controller("RegisterController", ['$scope', 'AuthService', '$state', '$rootScope', 'InfoModal',
    function ($scope, AuthService, $state, $rootScope, InfoModal) {
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";

        $scope.register = function () {
            if (!($scope.username.length && $scope.email.length && $scope.password.length)) {
                InfoModal.show({message: "გთხოვთ შეავსოთ ყველა ველი"});
                return;
            }
            AuthService.register({
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            }, function (err, flash) {
                if (!err) {
                    $rootScope.$broadcast('authentication', 'login');
                    $state.go("dashboard.profile");

                }
                else {
                    if (flash.length == 0) {
                        InfoModal.show({message: "გთხოვთ შეამოწმოთ შეყვანილი ინფორმაციის სიზუსტე", size: "md"});
                        return;
                    }
                    var messageCode = flash[0];
                    if (messageCode == "email_exists") {
                        return InfoModal.show({
                            message: "მომხმარებელი მითითებული ელ. ფოსტით უკვე არსებობს",
                            size: "md"
                        });
                    }
                    if (messageCode == "username_exists") {
                        return InfoModal.show({
                            message: "მომხმარებელი მითითებული მეტსახელით უკვე არსებობს",
                            size: "md"
                        });
                    }
                }
            });
        }
    }
]);