var apanelApp = angular.module('apanelApp', ['templates', 'ngAnimate', 'ui.router', 'ui.bootstrap']);

var _st = "/static/apanel/";

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
            controller: "HomeController"
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
        .state("app.word.list", {
            url: "/list?page",
            params: {
                page: {
                    value: '1',
                    squash: true
                }
            },
            templateUrl: _st + "word/list.html",
            controller: "WordListController"
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
        .state("app.forum.new-topic", {
            url: "/new-topic",
            templateUrl: _st + "forum/new-topic.html",
            controller: "NewTopicController"
        })
        .state("app.forum.topic", {
            url: "/topic/:topicId",
            templateUrl: _st + "forum/topic.html",
            controller: "TopicController"
        })
        .state("app.forum.last-posts", {
            url: "/last-posts",
            templateUrl: _st + "forum/last-posts.html",
            controller: "LastPostsController"
        })
        .state("app.collection", {
            url: "/collection",
            templateUrl: _st + "collection/collection.html",
            abstract: true
        })
        .state("app.collection.collection-list", {
            url: "/",
            templateUrl: _st + "collection/collection-list.html",
            controller: "CollectionController"
        })
        .state("app.collection.all-collection-list", {
            url: "/all?page",
            params: {
                page: {
                    value: '1',
                    squash: true
                }
            },
            templateUrl: _st + "collection/all-collection-list.html",
            controller: "AllCollectionListController"
        })
        .state("app.user", {
            url: "/user",
            templateUrl: _st + "user/user.html",
            abstract: true
        })
        .state("app.user.user-list", {
            url: "/",
            templateUrl: _st + "user/user-list.html",
            controller: "UserListController"
        })
        .state("app.irregular", {
            url: "/irregular",
            templateUrl: _st + "irregular/irregular.html",
            abstract:true
        })
        .state("app.irregular.irregular-list", {
            url: "/",
            templateUrl: _st + "irregular/irregular-list.html",
            controller: "IrregularListController"
        })
        .state("app.irregular.new-irregular", {
            url: "/new-irregular",
            templateUrl: _st + "irregular/new-irregular.html",
            controller: "NewIrregularController"
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
apanelApp.controller("DeletePostConfirmationController",
    ["$scope", "ForumService", "post_id", "$uibModalInstance", "$log",
        function ($scope, ForumService, post_id, $uibModalInstance, $log) {

            $scope.deletePost = function () {
                ForumService.deletePost({
                    postId: post_id
                }).then(function () {
                    $uibModalInstance.close();
                });
            };

            $scope.close = function () {
                $uibModalInstance.dismiss();
            }
        }
    ]);
apanelApp.controller("EditTopicController", ["$scope", "ForumService", "topic_id", "$uibModalInstance", "$log",
    function ($scope, ForumService, topic_id, $uibModalInstance, $log) {
        $scope.topicTitle = "";
        $scope.topicDescription = "";
        $scope.active = null;

        function fetchTopic() {
            ForumService.getOne(topic_id).then(function (data) {
                $log.log(data);
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
                $uibModalInstance.close();
            });

        };


    }
]);
apanelApp.controller("ForumController", ["$scope", "ForumService", "$uibModal", "$log",
    function ($scope, ForumService, $uibModal, $log) {

        function fetchTopicList() {
            ForumService.getTopicList().then(function (data) {
                $scope.topics = data.topics;
                $log.log(data);
            });
        }

        fetchTopicList();

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
                fetchTopicList();
            });

        };
    }
]);
apanelApp.factory("ForumService", ["$http", "$log",
    function ($http, $log) {
        var ForumService = {};
        var forumApanelEndpoint = "/apanel/api/forum/";
        var newTopicEndpoint = "/apanel/api/forum/";
        var updateTopicEndpoint = "/apanel/api/forum/";
        var getOneApiEndpoint = "/api/forum/topic/one/";
        var forumApiEndpoint = "/api/forum/";

        ForumService.getTopicPosts = function (params) {
            var topicId = params.topicId;
            return $http.get(forumApiEndpoint + "topic/posts/" + topicId).then(function (resp) {
                return resp.data.data;
            });
        };

        ForumService.getLatestPosts=function () {
            return $http.get(forumApanelEndpoint+"posts").then(function (resp) {
                $log.log(resp);
                return resp.data.data;
            })
        }

        ForumService.deletePost = function (params) {
            var postId = params.postId;
            return $http.delete(forumApanelEndpoint + "post/" + postId).then(function (resp) {
                return resp.data.data;
            });
        };

        ForumService.getOneTopic = function (params) {
            var topicId = params.topicId;
            return $http.get(forumApiEndpoint + "topic/one/" + topicId).then(function (resp) {
                return resp.data.data;
            });
        };


        ForumService.getTopicList = function () {
            return $http.get(forumApanelEndpoint).then(function (response) {
                $log.log(response);
                return response.data.data;
            });
        };

        ForumService.getOne = function (topic_id) {
            return $http.get(getOneApiEndpoint + topic_id).then(function (response) {
                $log.log(response);
                $log.log(response.data.data);
                return response.data.data;
            })
        };

        ForumService.addNewTopic = function (params) {
            return $http.post(newTopicEndpoint, {
                title: params.title,
                description: params.description,
                active: params.active
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        ForumService.update = function (params) {
            return $http.put(updateTopicEndpoint, {
                title: params.title,
                description: params.description,
                active: params.active,
                uid: params.uid
            }).then(function (response) {
                return response.data.status;
            });
        };

        return ForumService;
    }
]);
apanelApp.controller("LastPostsController", ["$scope", "ForumService", "$log",
    function ($scope, ForumService, $log) {
        function fetchlatestPosts() {
            ForumService.getLatestPosts().then(function (data) {
                $scope.posts = data.posts;
            });
        }

        fetchlatestPosts();
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
apanelApp.controller('TopicController', ['$scope', '$uibModal', '$log', '$stateParams', 'ForumService',
    function ($scope, $uibModal, $log, $stateParams, ForumService) {
        $scope.posts = [];

        function fetchTopic() {
            ForumService.getOneTopic({topicId: $stateParams.topicId}).then(function (data) {
                $scope.topic = data.topic;
                $log.log(data);
            })

        }

        fetchTopic();

        function fetchPosts() {
            ForumService.getTopicPosts({topicId: $stateParams.topicId}).then(function (data) {
                $scope.posts = data.posts;
            });
        }

        fetchPosts();


        $scope.deletePost = function (post_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/forum/delete-post.html',
                controller: 'DeletePostConfirmationController',
                size: "md",
                resolve: {
                    post_id: function () {
                        return post_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                fetchPosts();
            });

        };
    }
]);
apanelApp.controller("AllCollectionListController", [
    "$scope", "CollectionService", "$uibModal", "$log", "$stateParams", "$state",
    function ($scope, CollectionService, $uibModal, $log, $stateParams, $state) {
        $scope.orderByField = 'created_at';
        $scope.reverseSort = true;
        $scope.limit = 20;
        $scope.count = 0;

        function fetchAllCollectionList() {
            CollectionService.getAllCollectionList({
                limit: $scope.limit,
                page: $stateParams.page
            }).then(function (data) {
                $scope.collections = data.collections;
                $scope.count = data.count;
                $scope.page = $stateParams.page;
                $log.log(data);
            });
        }

        fetchAllCollectionList();

        $scope.modify = function (collection_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/collection/modify-collection.html',
                controller: 'ModifyCollectionController',
                size: "lg",
                resolve: {
                    collection_id: function () {
                        return collection_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                fetchAllCollectionList();
            });

        };

        $scope.changePage = function () {
            $state.go(".", {page: $scope.page});
        };
    }
]);
apanelApp.controller("CollectionController", ["$scope", "ForumService", "$uibModal", "CollectionService", "$log",
    function ($scope, ForumService, $uibModal, CollectionService, $log) {

        function fetchCollectionList() {
            CollectionService.getCollectionList().then(function (data) {
                $scope.collections = data.collections;
                $log.log(data);
            });
        }

        fetchCollectionList();

        $scope.modify = function (collection_id) {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/apanel/collection/modify-collection.html',
                controller: 'ModifyCollectionController',
                size: "lg",
                resolve: {
                    collection_id: function () {
                        return collection_id;
                    }
                }
            });

            groupModal.result.then(function () {
                $log.log("Done");
                fetchCollectionList();
            });

        };
    }
]);
apanelApp.factory("CollectionService", ['$http',
    function ($http) {
        var CollectionService = {};

        var CollectionApiEndpoint = "/apanel/api/collection/";
        var OneCollectionApiEndpoint="/api/collection/";

        CollectionService.getAllCollectionList = function (params) {
            params.limit = params.limit || 1;
            params.page = params.page || 1;
            return $http.get(CollectionApiEndpoint,{params: params}).then(function (resp) {
                return resp.data;
            });
        };

        CollectionService.getCollectionList = function () {
            return $http.get(CollectionApiEndpoint+"pending").then(function (resp) {
                return resp.data.data;
            });
        };

        CollectionService.getOne = function (CollectionId) {
            return $http.get(OneCollectionApiEndpoint + CollectionId).then(function (resp) {
                return resp.data.data;
            });
        };

        CollectionService.validate=function (params) {
            return $http.post(CollectionApiEndpoint + "validate", {
                uid: params.uid,
                accepted: params.accepted,
                name:params.name,
                description:params.description
            }).then(function (resp) {
                return resp.data.status;
            });
        }

        return CollectionService;
    }
]);
apanelApp.controller("ModifyCollectionController", ["$scope", "$uibModalInstance", "CollectionService","collection_id","$log",
    function ($scope, $uibModalInstance, CollectionService,collection_id ,$log) {
        $scope.collectionTypeText = "";
        $scope.active="";

        function fetchCollection() {
            CollectionService.getOne(collection_id).then(function (data) {
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionTypeText = data.collection.is_public ? "ღია კოლექცია" : "პირადი კოლექცია";
                $scope.active=data.collection.accepted?"ვალიდური":"არა ვალიდური";
                $scope.accepted=data.collection.accepted;
                $log.log(data.collection);
            });
        }

        fetchCollection();

        $scope.editCollection=function () {
            CollectionService.validate({
                uid: collection_id,
                name: $scope.collectionName,
                description: $scope.collectionDescription,
                accepted:$scope.accepted
            }).then(function () {
                $uibModalInstance.close();
            });
        };
        // $scope.approve = function (CollectionId) {
        //     CollectionService.validate({uid: CollectionId, accepted:true}).then(function (data) {
        //         fetchCollection();
        //     });
        // };
        //
        // $scope.reject = function (CollectionId) {
        //     CollectionService.validate({uid: CollectionId, accepted:false}).then(function (data) {
        //         fetchCollection();
        //         $scope.close();
        //     });
        // };

        $scope.close = function () {
            $uibModalInstance.close();
        };


    }
]);

apanelApp.controller('HeaderController', ["$scope", function ($scope) {
        $scope.navCollapsed = 1;
    }]
);
apanelApp.controller('HomeController', ["$scope", "StatsService",
    function ($scope, StatsService) {
        StatsService.summary().then(function (data) {
            $scope.stats = data;
        });
    }
]);
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
apanelApp.factory("IrregularService", ['$http',
    function ($http) {
        var IrregularService = {};

        var IrregularApiEndpoint = "/apanel/api/irregular/";

        IrregularService.getIrregularList = function () {
            return $http.get(IrregularApiEndpoint+"list").then(function (resp) {
                return resp.data.data;
            });
        };

        IrregularService.getOne = function (IrregularId) {
            return $http.get(IrregularApiEndpoint + IrregularId).then(function (resp) {
                return resp.data.data;
            });
        };

        IrregularService.modify = function (params) {
            return $http.post(IrregularApiEndpoint + "modify", {
                uid: params.uid,
                form_one:params.form_one,
                form_two:params.form_two,
                form_three:params.form_three,
                description: params.description
            }).then(function (resp) {
                return resp.data.status;
            });
        };

        IrregularService.addNewIrregular = function (params) {
            return $http.post(IrregularApiEndpoint, {
                form_one:params.form_one,
                form_two:params.form_two,
                form_three:params.form_three,
                description:params.description,
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        return IrregularService;
    }
]);
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
apanelApp.controller("UserListController",["$scope", "UserService", "$uibModal", "$log",
    function ($scope, UserService, $uibModal, $log) {
        function fetchUsersList() {
            UserService.getUsersList().then(function (data) {
                $scope.users = data.users;
                $log.log(data);
            });
        }

        fetchUsersList();

    }
]);
apanelApp.factory("UserService", ['$http',
    function ($http) {
        var UserService = {};

        var UserApiEndpoint = "/apanel/api/users";

        UserService.getUsersList = function () {
            return $http.get(UserApiEndpoint).then(function (resp) {
                return resp.data.data;
            });
        };

        return UserService;
    }
]);
apanelApp.factory("StatsService", ['$http',
    function ($http) {
        var StatsService = {};

        var StatsApiEndpoint = "/apanel/api/stats";

        StatsService.summary = function () {
            return $http.get(StatsApiEndpoint + "/summary").then(function (resp) {
                return resp.data.data;
            });
        };

        return StatsService;
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

        $scope.swap = function () {
            var tmp = $scope.wordDescription;
            $scope.wordDescription = $scope.wordName;
            $scope.wordName = tmp;
        };

        $scope.lower = function () {
            $scope.wordName = $scope.wordName.toLocaleLowerCase();
        };

        $scope.capitalize = function () {
            $scope.wordName = $scope.wordName.charAt(0).toUpperCase() + $scope.wordName.slice(1);
        };


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
apanelApp.controller("WordListController", ["$scope", "$uibModal", "WordService", "$stateParams", "$state",
    function ($scope, $uibModal, WordService, $stateParams, $state) {

        $scope.limit = 50;
        $scope.count = 0;

        function fetchList() {
            WordService.list({
                limit: $scope.limit,
                page: $stateParams.page
            }).then(function (data) {
                $scope.words = data.words;
                $scope.count = data.count;
                $scope.page = $stateParams.page;
            });
        }

        fetchList();

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
                fetchList();
            });
        };

        $scope.changePage = function () {
            $state.go(".", {page: $scope.page});
        };
    }
]);
apanelApp.factory("WordService", ['$http',
    function ($http) {
        var WordService = {};

        var WordApiEndpoint = "/apanel/api/word/";

        WordService.list = function (params) {
            params.limit = params.limit || 1;
            params.page = params.page || 1;
            return $http.get(WordApiEndpoint + "list", {params: params}).then(function (resp) {
                return resp.data;
            });
        };

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