var app = angular.module('myApp',
    ['templates', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics']);

var _st = "/static/app/";

app.controller('FooterController', function ($scope) {

});

app.directive('title', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            link: function () {
                var listener = function (event, toState) {
                    $timeout(function () {
                        //console.log(toState);
                        $rootScope.title = (toState.data && toState.data.pageTitle)
                            ? 'Learn.Translate.Ge - ' + toState.data.pageTitle
                            : 'Learn.Translate.Ge';
                    });
                };
                $rootScope.$on("$stateChangeSuccess", listener);
            }
        };
    }
]);
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    //$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //$httpProvider.defaults.headers.get = {'Cache-Control': 'no-cache', 'Pragma': 'no-cache'};
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $urlRouterProvider
    //.when('/access', '/access/users')
        .otherwise('/home');

    $stateProvider
        .state("app", {
            //abstract: true,
            url: "/home",
            templateUrl: _st + "home/home.html",
            controller: "HomeController",
            data: {requireLogin: false, pageTitle: "მთავარი"}
        })
        .state("contact", {
            url: "/contact",
            templateUrl: _st + "home/contact.html"
        })
        .state("login", {
            url: "/login",
            templateUrl: _st + "auth/login.html",
            controller: "LoginController",
            data: {requireLogin: false, pageTitle: "ავტორიზაცია"}
        })
        .state("register", {
            url: "/register",
            templateUrl: _st + "auth/register.html",
            controller: "RegisterController",
            data: {requireLogin: false, pageTitle: "რეგისტრაცია"}
        })
        .state("dashboard", {
            abstract: true,
            templateUrl: _st + "dashboard/dashboard.html"
        })
        .state("dashboard.profile", {
            url: "/dashboard",
            data: {requireLogin: true, pageTitle: "ჩემი ანგარიში"},
            templateUrl: _st + "dashboard/profile.html",
            controller: "ProfileController"
        })
        .state("collection", {
            abstract: true,
            templateUrl: _st + "collection/collection.html"
        })
        .state("collection.list", {
            url: "/collection",
            data: {requireLogin: true, pageTitle: "კოლექციები"},
            templateUrl: _st + "collection/collection-list.html",
            controller: "CollectionController"
        })
        .state("collection.view", {
            url: "/collection/view/:collection",
            data: {requireLogin: true, pageTitle: "კოლექციის ნახვა"},
            templateUrl: _st + "collection/view-collection.html",
            controller: "ViewCollectionController"
        })
        .state("collection.edit", {
            url: "/collection/edit/:collection",
            data: {requireLogin: true, pageTitle: "კოლექციის რედაქტირება"},
            templateUrl: _st + "collection/edit-collection.html",
            controller: "EditCollectionController"
        })
        .state("collection.create", {
            url: "/collection/create",
            data: {requireLogin: true, pageTitle: "კოლექციის შექმნა"},
            templateUrl: _st + "collection/create-collection.html",
            controller: "CreateCollectionController"
        })
        .state("collection.mine", {
            url: "/collection/my",
            data: {requireLogin: true, pageTitle: "ჩემი კოლექციები"},
            templateUrl: _st + "collection/my-collection.html",
            controller: "MyCollectionController"
        })
        .state("practice", {
            url: "/practice/:collection",
            data: {requireLogin: true, pageTitle: "პრაქტიკა"},
            templateUrl: _st + "practice/practice.html",
            controller: "PracticeController"
        })
        .state("forum", {
            abstract: true,
            templateUrl: _st + "forum/forum.html"
        })
        .state("forum.index", {
            url: "/forum",
            data: {requireLogin: true, pageTitle: "ფორუმი"},
            templateUrl: _st + "forum/index.html",
            controller: "ForumIndexController"
        })
        .state("forum.topic", {
            url: "/forum/topic/:topicId?page",
            params: {
                page: {
                    value: '1',
                    squash: true
                }
            },
            data: {requireLogin: true, pageTitle: "ფორუმი"},
            templateUrl: _st + "forum/topic.html",
            controller: "TopicController"
        })
        .state("irregular", {
            abstract: true,
            templateUrl: _st + "irregular/irregular.html"
        })
        .state("irregular.list", {
            url:"/irregular",
            data: {requireLogin: true, pageTitle: "არაწესიერი ზმნები"},
            templateUrl: _st + "irregular/irregular-list.html",
            controller:"IrregularListController"
        });
});

app.run(["AuthService", "$rootScope", "$state",
    function (AuthService, $rootScope, $state) {
        AuthService.startUp();
        console.log("hey");
        //$rootScope.title = "მთავარი"


        $rootScope.$on('$stateChangeStart', function (e, toState, toParams
            , fromState, fromParams) {

            console.log("shamavixede");

            var needLogIn = toState.data.requireLogin;
            if (!needLogIn) {
                return; // no need to redirect
            }

            // now, redirect only not authenticated

            if (AuthService.authenticated === false) {
                e.preventDefault(); // stop current execution
                $state.go('login'); // go to login
            }
        });
    }
]);

app.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toLowerCase();
                if (scope.isCapital) {
                    capitalized = capitalized.substring(0, 1).toUpperCase() + capitalized.substring(1);
                }
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            };
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});