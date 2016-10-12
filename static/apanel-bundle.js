var apanelApp = angular.module('apanelApp', ['templates', 'ngAnimate', 'ui.router', 'ui.bootstrap']);

var _st = "/static/apanel/";


apanelApp.controller('MyController', function ($scope, $uibModal, $log) {

});

apanelApp.controller('HeaderController', function ($scope, $templateCache) {

});
apanelApp.controller('FooterController', function ($scope) {

});
apanelApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    //$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //$httpProvider.defaults.headers.get = {'Cache-Control': 'no-cache', 'Pragma': 'no-cache'};
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $urlRouterProvider
    // .when('/access', '/access/users')
    // .when('/word', '/word/pending')
        .otherwise('/home');

    $stateProvider
        .state("app", {
            //abstract: true,
            views: {
                "header": {
                    templateUrl: _st + "partial/header.html",
                    controller: "HeaderController"
                },
                "": {
                    template: "<div ui-view></div>"
                    // controller: "contentController"
                },
                "footer": {
                    templateUrl: _st + "partial/footer.html",
                    controller: "FooterController"
                }
            }
        })
        .state("app.home", {
            url: "/home",
            templateUrl: _st + "partial/home.html",
            controller: "MyController"
        })
        .state("app.access", {
            // url: "/access",
            abstract: true,
            templateUrl: _st + "access/access-index.html",
            controller: "AccessMainController"
        })
        .state("app.access.groups", {
            url: "/groups",
            templateUrl: _st + "access/access-groups.html",
            controller: "AccessGroupsController"

        })
        .state("app.access.users", {
            url: "/users",
            templateUrl: _st + "access/access-users.html",
            controller: "AccessUsersController"
        })
        .state("app.access.permissions", {
            url: "/permissions",
            templateUrl: _st + "access/access-permissions.html",
            controller: "AccessPermissionsController"
        })
        .state("app.word", {
            url: "/word",
            abstract: true,
            templateUrl: _st + "word/word.html",
            controller: "WordController"
        })
        .state("app.word.pending", {
            url: "/pending",
            templateUrl: _st + "word/pending-word.html",
            controller: "PendingWordController"
        })
        .state("app.forum", {
            url: "/forum",
            templateUrl: _st + "forum/forum.html",
            abstract: true
        })
        .state("app.forum.list", {
            url: "/",
            templateUrl: _st + "forum/list.html",
            controller: "ForumController"
        })
        .state("app.forum.new-topic",{
            url:"/new-topic",
            templateUrl: _st + "forum/new-topic.html",
            controller:"NewTopicController"
        })
    ;
})
;
apanelApp.controller("AccessGroupsController", function ($scope, GroupAccess, $uibModal,$log) {
    var getAll = function () {
        GroupAccess.getList().then(function (data) {
            $log.log(data);
            $scope.groups = data.groups;
        });
    };

    getAll();
    $scope.search = {};

    $scope.view = function (group_id) {
        $log.log(group_id);

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
            $log.log("wtf");
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
            $log.log($scope.permissions);
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
apanelApp.controller('AccessMainController', function ($scope) {

});
    //$scope.users = [
    //    {
    //        name: "xundzaka",
    //        theaters: [],
    //        groups: []
    //    },
    //    {
    //        name: "nika",
    //        theaters: [],
    //        groups: []
    //    }
    //];
apanelApp.controller("AccessPermissionsController", function ($scope, PermissionAccess, $uibModal,$log) {
    var getAll = function () {
        PermissionAccess.getList().then(function (data) {
            $log.log(data);
            $scope.permissions = data.permissions;
        });
    };

    getAll();
    $scope.search = {};

    $scope.view = function (permission_id) {
        $log.log(permission_id);

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
            $log.log("wtf");
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
apanelApp.controller("AccessUsersController", function ($scope, UserAccess, $uibModal,$log) {
    UserAccess.getList().then(function (data) {
        $scope.users_list = data.users;
    });
    $scope.search = {};

    $scope.view = function (user_id) {
        $log.log(user_id);

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
apanelApp.factory("GroupAccess", function ($http,$log) {
    var GroupAccess = function () {

    };
    var groupAccessEndpoint = "/apanel/api/group/";

    GroupAccess.getList = function () {
        return $http.get(groupAccessEndpoint).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    GroupAccess.getOne = function (groupId) {
        return $http.get(groupAccessEndpoint + groupId).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    GroupAccess.create = function (group_name) {
        return $http.post(groupAccessEndpoint, {
            name: group_name
        }).then(function (response) {
            return response.data.status;
        });
    };

    GroupAccess.update = function (groupId, groupName) {
        return $http.put(groupAccessEndpoint, {
            groupId: groupId,
            name: groupName
        }).then(function (response) {
            return response.data.status;
        });
    };

    GroupAccess.togglePermission = function (groupId, permissionId, operation) {
        return $http.post(groupAccessEndpoint + "permission/", {
            groupId: groupId,
            permissionId: permissionId,
            operation: operation
        }).then(function (response) {
            return response.data.status;
        });
    };

    return GroupAccess;
});
apanelApp.factory("PermissionAccess", function ($http,$log) {
    var PermissionAccess = function () {

    };
    var permissionAccessEndpoint = "/apanel/api/permission/";

    PermissionAccess.getList = function () {
        return $http.get(permissionAccessEndpoint).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    PermissionAccess.getOne = function (permissionId) {
        return $http.get(permissionAccessEndpoint + permissionId).then(function (response) {
            $log.log(response);
            return response.data.data;
        });
    };

    PermissionAccess.create = function (permission_name, permission_key) {
        return $http.post(permissionAccessEndpoint, {
            name: permission_name,
            key: permission_key
        }).then(function (response) {
            return response.data.status;
        });
    };

    PermissionAccess.update = function (permissionId, permissionName) {
        return $http.put(permissionAccessEndpoint, {
            permissionId: permissionId,
            name: permissionName
        }).then(function (response) {
            return response.data.status;
        });
    };

    return PermissionAccess;
});
apanelApp.factory("UserAccess", function ($http) {
    var UserAccess = function () {

    };
    var user_access_endp = "/apanel/api/user/";

    UserAccess.getList = function () {
        return $http.get(user_access_endp).then(function (response) {
            console.log(response);
            return response.data.data;
        });
    };

    UserAccess.getOne = function (userId) {
        return $http.get(user_access_endp + userId).then(function (response) {
            console.log(response);
            return response.data.data;
        });
    };

    UserAccess.toggleGroup = function (user_id, group_id, operation) {
        return $http.post(user_access_endp + "group/", {
            userId: user_id,
            groupId: group_id,
            operation: operation
        }).then(function (response) {
            return response.data.status;
        });
    };

    return UserAccess;
});

/**
 * Created by george on 10.07.2016.
 */

apanelApp.controller("EditTopicController", ["$scope", "ForumService", "topic_id", "$uibModal", "$uibModalInstance", "$log",
    function ($scope, ForumService, topic_id, $uibModal, $uibModalInstance, $log) {
        $scope.topicTitle = "";
        $scope.topicDescription = "";
        $scope.active = null;

        function fetchTopic() {
            ForumService.getOne(topic_id).then(function (data) {
                $log.log(data);
                $log.log(topic_id);
                $scope.topicTitle = data.topic.title;
                $scope.topicDescription = data.topic.description;
            });
        }

        fetchTopic();


        $scope.editTopic = function () {
            ForumService.update({
                title: $scope.topicTitle,
                description: $scope.topicDescription,
                active: $scope.active,
                uid: topic_id
            }).then(function () {
                fetchTopic();
            });

        };


    }
]);
apanelApp.controller("ForumController", ["$scope","ForumService","$uibModal","$log",
    function ($scope,ForumService,$uibModal,$log) {
        ForumService.getTopicList().then(function (data) {
            $scope.topics = data.topics;
            $log.log(data);
        });
        $log.log("fuck");

        $scope.modify = function (topic_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/forum/edit-topic.html',
                controller: 'EditTopicController',
                size: "lg",
                resolve: {
                    topic_id: function () {
                        return topic_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                getTopicList();
            });

        };
    }
]);
apanelApp.factory("ForumService", ["$http", "$log",
    function ($http, $log) {
        var ForumService = {};
        var getListEndpoint = "/apanel/api/forum";
        var newTopicEndpoint = "/apanel/api/forum/";
        var updateTopicEndpoint = "/apanel/api/forum/";
        var getOneApiEndpoint = "/api/forum/topic/one/";

        ForumService.getTopicList = function () {
            return $http.get(getListEndpoint).then(function (response) {
                $log.log(response);
                return response.data.data;
            });
        };

        ForumService.getOne = function (topic_id) {
            return $http.get(getOneApiEndpoint + topic_id).then(function (response) {
                $log.log(response);
                $log.log("found");
                $log.log(response.data.data);
                return response.data.data;
            })
        };

        ForumService.addNewTopic = function (params) {
            return $http.post(newTopicEndpoint, {
                title: params.title,
                description: params.description,
                active: params.active,
                uid: params.uid
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        ForumService.update = function (title, description, active, topic_id) {
            var value = {
                title: title,
                description: description,
                active: active,
                uid: topic_id
            };
            $log.log(value);
            return $http.put(updateTopicEndpoint, value).then(function (response) {
                return response.data.status;
            });
        };

        return ForumService;
    }
]);
apanelApp.controller("NewTopicController",["$scope","ForumService","$state","$log",
    function ($scope,ForumService,$state,$log) {
        $scope.topicTitle='';
        $scope.topicDescription='';
        $scope.active;

        $scope.submit = function () {
            ForumService.addNewTopic({
                title: $scope.topicTitle,
                description: $scope.topicDescription,
                active:$scope.active
            }).then(function () {
                $state.go('app.forum.list');
            })
        };

    }
]);
apanelApp.controller("ModifyWordController", ["$scope", "WordService", "wordId", "$uibModalInstance",
    function ($scope, WordService, WordId, $uibModalInstance) {
        $scope.wordName = "";
        $scope.wordDescription = "";
        $scope.addNewWord = function () {
            var valid = $scope.wordName != "" && $scope.wordDescription != "";
            if (valid) {
                WordService.modify({
                    uid: WordId,
                    value: $scope.wordName,
                    description: $scope.wordDescription
                }).then(function () {
                    $uibModalInstance.close();
                });
            }
            else {
                alert("შეავსეთ ყველა ველი");
            }
        };

        function fetchWord() {
            WordService.one(WordId).then(function (data) {
                console.log(data);
                $scope.wordName = data.word.value;
                // check words count
                $scope.wordDescription = data.word.description;
            });
        }

        fetchWord();


        $scope.close = function () {
            $uibModalInstance.close();
        }
    }
]);
apanelApp.controller("PendingWordController", ["$scope", "$uibModal", "WordService", "$state",
    function ($scope, $uibModal, WordService, $state) {
        $scope.collectionTypeText = "";

        function fetchPending() {
            WordService.pendingList().then(function (data) {
                $scope.words = data.words;
            });
        }

        fetchPending();

        $scope.modify = function (wordId) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/word/modify-word.html',
                controller: 'ModifyWordController',
                size: "lg",
                resolve: {
                    wordId: function () {
                        return wordId;
                    }
                }
            });

            groupModal.result.then(function () {
                console.log("Done");
                fetchPending();
            });
        };

        $scope.approve = function (wordId) {
            WordService.validate({uid: wordId, accepted:true}).then(function (data) {
                fetchPending();
            });
        };

        $scope.reject = function (wordId) {
            WordService.validate({uid: wordId, accepted:false}).then(function (data) {
                fetchPending();
            });
        };
    }
]);
apanelApp.controller("WordController", ["$scope", "$stateParams", "$uibModal", "$state",
    function ($scope, $stateParams, $uibModal, $state) {
        
    }
]);
apanelApp.factory("WordService", ['$http',
    function ($http) {
        var WordService = {};

        var WordApiEndpoint = "/apanel/api/word/";

        WordService.pendingList = function () {
            return $http.get(WordApiEndpoint + "pending").then(function (resp) {
                return resp.data.data;
            });
        };

        WordService.one = function (wordId) {
            return $http.get(WordApiEndpoint + "one/" + wordId).then(function (resp) {
                return resp.data.data;
            });
        };

        WordService.validate = function (params) {
            return $http.post(WordApiEndpoint + "validate", {
                uid: params.uid,
                accepted: params.accepted
            }).then(function (resp) {
                return resp.data.status;
            });
        };

        WordService.modify = function (params) {
            return $http.post(WordApiEndpoint + "modify", {
                uid: params.uid,
                value: params.value,
                description: params.description
            }).then(function (resp) {
                return resp.data.status;
            });
        };
        return WordService;
    }
]);