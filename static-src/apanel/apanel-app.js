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