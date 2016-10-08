apanelApp.controller("AccessPermissionsController", function ($scope, PermissionAccess, $uibModal,$log) {
    var getAll = function () {
        PermissionAccess.getList().then(function (data) {
            $log(data);
            $scope.permissions = data.permissions;
        });
    };

    getAll();
    $scope.search = {};

    $scope.view = function (permission_id) {
        $log(permission_id);

        var groupModal = $uibModal.open({
            animation: true,
            templateUrl: 'custom/tpl/permissionModalContent',
            controller: 'PermissionModalController',
            resolve: {
                permission_id: function () {
                    return permission_id;
                }
            }
        });
    };

    $scope.create = function () {

        var groupModal = $uibModal.open({
            animation: true,
            templateUrl: 'custom/tpl/createPermissionModalContent',
            controller: 'CreatePermissionModalController',
            resolve: {}
        });

        groupModal.result.then(function () {
            $log("wtf");
            getAll();
        });
    };
});

apanelApp.controller("CreatePermissionModalController", function ($scope, $uibModalInstance, PermissionAccess) {
    $scope.close = function () {
        $uibModalInstance.close();
    };

    $scope.permissionName = "";
    $scope.permissionKey = "";

    $scope.create = function () {
        PermissionAccess.create($scope.permissionName, $scope.permissionKey).then(function (status) {
            if (status) {
                $scope.close();
            }
        });
    };
});


apanelApp.controller("PermissionModalController", function ($scope, $uibModalInstance, PermissionAccess, permission_id) {
    var getOne = function () {
        PermissionAccess.getOne({user_id: {collectionId: permission_id}}).then(function (data) {
            $scope.permission = data.permission;
            $scope.permissionName = $scope.permission.name;
            $scope.permissionKey = $scope.permission._id;
        });
    };

    getOne();

    $scope.close = function () {
        $uibModalInstance.close();
    };


    $scope.save = function () {
        PermissionAccess.update($scope.permission._id, $scope.permissionName)
            .then(function (status) {
                if (status) {
                    $scope.close();
                }
            });
    };
});