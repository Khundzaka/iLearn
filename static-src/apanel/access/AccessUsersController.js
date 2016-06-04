apanelApp.controller("AccessUsersController", function ($scope, UserAccess, $uibModal) {
    UserAccess.getList().then(function (data) {
        $scope.users_list = data.users;
    });
    $scope.search = {};

    $scope.view = function (user_id) {
        console.log(user_id);

        var userModal = $uibModal.open({
            animation: true,
            templateUrl: 'custom/tpl/userModalContent',
            controller: 'UserModalController',
            resolve: {
                user_id: function () {
                    return user_id;
                }
            }
        });

        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    $log.info('Modal dismissed at: ' + new Date());
        //});
    };
});


apanelApp.controller("UserModalController", function ($scope, $uibModalInstance, UserAccess, user_id) {
    var getOne = function () {
        UserAccess.getOne(user_id).then(function (data) {
            $scope.user = data.user;
            $scope.groups = data.groups;
        });
    };

    getOne();

    $scope.close = function () {
        $uibModalInstance.close();
    };
    $scope.addToGroup = function (group_id) {
        UserAccess.toggleGroup(user_id, group_id, "add").then(function (status) {
            if (status) {
                getOne();
            }
        });
    };
    $scope.removeFromGroup = function (group_id) {
        UserAccess.toggleGroup(user_id, group_id, "remove").then(function (status) {
            if (status) {
                getOne();
            }
        });
    };
    $scope.hasGroup = function (group_id) {
        return $scope.user.groups.indexOf(group_id) >= 0;
    };
});