apanelApp.controller("AccessGroupsController", function ($scope, GroupAccess, $uibModal,$log) {
    var getAll = function () {
        GroupAccess.getList().then(function (data) {
            $log(data);
            $scope.groups = data.groups;
        });
    };

    getAll();
    $scope.search = {};

    $scope.view = function (group_id) {
        $log(group_id);

        var groupModal = $uibModal.open({
            animation: true,
            templateUrl: 'custom/tpl/groupModalContent',
            controller: 'GroupModalController',
            resolve: {
                group_id: function () {
                    return group_id;
                }
            }
        });
    };

    $scope.create = function () {

        var groupModal = $uibModal.open({
            animation: true,
            templateUrl: 'custom/tpl/createGroupModalContent',
            controller: 'CreateGroupModalController',
            resolve: {}
        });

        groupModal.result.then(function () {
            $log("wtf");
            getAll();
        });
    };
});

apanelApp.controller("CreateGroupModalController", function ($scope, $uibModalInstance, GroupAccess) {
    $scope.close = function () {
        $uibModalInstance.close();
    };

    $scope.groupName = "";

    $scope.create = function () {
        GroupAccess.create($scope.groupName).then(function (status) {
            if (status) {
                $scope.close();
            }
        });
    };
});


apanelApp.controller("GroupModalController", function ($scope, $uibModalInstance, GroupAccess, group_id,$log) {
    var getOne = function () {
        GroupAccess.getOne({user_id: {collectionId: group_id}}).then(function (data) {
            $scope.group = data.group;
            $scope.permissions = data.permissions;
            $scope.groupName = $scope.group.name;
            $log($scope.permissions);
        });
    };

    getOne();

    $scope.save = function () {
        GroupAccess.update(group_id, $scope.groupName, "update").then(function (status) {
            if (status) {
                getOne();
            }
        });
    };

    $scope.close = function () {
        $uibModalInstance.close();
    };
    $scope.addPermission = function (permission_id) {
        GroupAccess.togglePermission(group_id, permission_id, "add").then(function (status) {
            if (status) {
                getOne();
            }
        });
    };
    $scope.removePermission = function (permission_id) {
        GroupAccess.togglePermission(group_id, permission_id, "remove").then(function (status) {
            if (status) {
                getOne();
            }
        });
    };
    $scope.hasPermission = function (permission_id) {
        return $scope.group.permissions.indexOf(permission_id) >= 0;
    };
});