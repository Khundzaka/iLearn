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
        .when('/access', '/access/users')
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
            views: {
                "": {
                    templateUrl: _st + "partial/home.html",
                    controller: "MyController"
                }
            }
        })
        .state("app.access", {
            url: "/access",
            //abstract: true,
            views: {
                "": {
                    templateUrl: _st + "access/access-index.html",
                    controller: "AccessMainController"
                }
            }
        })
        .state("app.access.groups", {
            url: "/groups",
            views: {
                "": {
                    templateUrl: _st + "access/access-groups.html",
                    controller: "AccessGroupsController"
                }
            }
        })
        .state("app.access.users", {
            url: "/users",
            views: {
                "": {
                    templateUrl: _st + "access/access-users.html",
                    controller: "AccessUsersController"
                }
            }
        })
        .state("app.access.permissions", {
            url: "/permissions",
            views: {
                "": {
                    templateUrl: _st + "access/access-permissions.html",
                    controller: "AccessPermissionsController"
                }
            }
        })
    ;
});