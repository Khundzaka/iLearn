var app = angular.module('myApp', ['templates', 'ngAnimate', 'ui.router', 'ui.bootstrap']);

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
        .state("how-it-works", {
            url: "/how-it-works",
            templateUrl: _st + "home/how-it-works.html",
            data: {requireLogin: false, pageTitle: "როგორ მუშაობს"}
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

app.factory("AuthService", ['$http',
    function ($http) {
        var AuthService = {
            authenticated: false,
            local: {
                username: null,
                email: null
            },
            facebook: {
                fullName: null,
                email: null
            }
        };
        AuthService.logIn = function (email, password, callback) {
            console.log("aq var");
            $http.post("/local/login", {email: email, password: password}).then(function (res) {
                if (res.data._id) {
                    var userData = res.data;
                    if (userData.local) this.local = userData.local;
                    if (userData.facebook) this.facebook = userData.facebook;
                    AuthService.authenticated = true;
                    //console.log("aqac var");
                    callback(true);
                }
            });
        };
        AuthService.register = function (params, callback) {
            var email = params.email, password = params.password, username = params.username;
            console.log("aq var");
            $http.post("/local/register", {email: email, password: password, username: username}).then(function (res) {
                if (res.data._id) {
                    var userData = res.data;
                    if (userData.local) this.local = userData.local;
                    if (userData.facebook) this.local = userData.facebook;
                    AuthService.authenticated = true;
                    //console.log("aqac var");
                    callback(true);
                }
            });
        };

        AuthService.logOut = function (callback) {
            $http.get("/local/logout").then(function (res) {
                if (res.data.status === "ok") {
                    AuthService.authenticated = false;
                    return callback(true);
                }
            });
        };

        AuthService.startUp = function () {
            if (typeof startUpUserData === 'undefined') startUpUserData = false;
            var userData = startUpUserData;
            console.log("eh");
            if (userData) {
                userData = JSON.parse(userData);
                // console.log(userData.facebook);
                console.log(userData);
                console.log("wtf");
                if (userData.local) this.local = userData.local;
                if (userData.facebook) this.facebook = userData.facebook;
                AuthService.authenticated = true;
            }
        };

        return AuthService;
    }
]);
app.controller("LoginController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
        $scope.username = "";
        $scope.password = "";

        $scope.loginSubmit = function () {
            AuthService.logIn($scope.username, $scope.password, function (success) {
                if (success) {
                    $rootScope.$broadcast('authentication', 'login');
                    $location.path("/");
                }
            });
        }
    }
]);
app.controller("RegisterController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";

        $scope.register = function () {
            AuthService.register({
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            }, function (success) {
                if (success) {
                    $rootScope.$broadcast('authentication', 'login');
                    $location.path("/");
                }
            });
        }
    }
]);
app.controller("AddWordController", ["$scope", "Collection", "WordService", "collectionId", "$uibModalInstance",
    function ($scope, Collection, WordService, collectionId, $uibModalInstance) {
        //console.log(collectionId);
        $scope.findInput = "";
        $scope.addNewWord = function () {
            Collection.addNewWord({
                collectionId: collectionId,
                wordName: $scope.wordName,
                wordDescription: $scope.wordDescription
            }).then(function (data) {
                console.log(data);
                $uibModalInstance.close();
            });
        };

        $scope.addWord = function (wordId) {
            Collection.addWord({wordId: wordId, collectionId: collectionId}).then(function (data) {
                console.log(data);
                $uibModalInstance.close();
            });
        };

        $scope.find = function () {
            WordService.find($scope.findInput).then(function (data) {
                $scope.words = data.words;
            });
        };
    }
]);
app.factory("Collection", ["$http",
    function ($http) {
        var collectionPath = "/api/collection/";
        var Collection = {};
        Collection.getList = function () {
            return $http.get(collectionPath).then(function (resp) {
                return resp.data.data;
            });
        };
        Collection.getUserCollections = function () {
            return $http.get(collectionPath + "my").then(function (resp) {
                return resp.data.data;
            });
        };

        Collection.getOne = function (collectionId) {
            return $http.get(collectionPath + collectionId).then(function (resp) {
                return resp.data.data;
            });
        };

        Collection.create = function (params) {
            var name = params.name;
            var description = params.description;
            var isPublic = params.isPublic;

            return $http.post(collectionPath, {
                name: name,
                isPublic: isPublic,
                description: description
            }).then(function (resp) {
                return resp.data.data;
            });

        };

        Collection.update = function (params) {
            var name = params.name;
            var description = params.description;
            var collectionId = params.collectionId;

            return $http.put(collectionPath, {
                name: name,
                description: description,
                collectionId: collectionId
            }).then(function (resp) {
                return resp.data.status;
            });

        };

        Collection.addWord = function (params) {
            var collectionId = params.collectionId;
            var wordId = params.wordId;
            console.log(params);
            return $http.post(collectionPath + "word/add", {
                collectionId: collectionId,
                wordId: wordId
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        Collection.removeWord = function (params) {
            var collectionId = params.collectionId;
            var wordId = params.wordId;
            return $http.post(collectionPath + "word/remove", {
                collectionId: collectionId,
                wordId: wordId
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        Collection.addNewWord = function (params) {
            var collectionId = params.collectionId;
            var wordName = params.wordName;
            var wordDescription = params.wordDescription;
            return $http.post(collectionPath + "word/new", {
                collectionId: collectionId,
                wordName: wordName,
                wordDescription: wordDescription
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        return Collection;
    }
]);
app.controller("CollectionController", ["$scope","Collection",
    function ($scope, Collection) {
        Collection.getList().then(function (data) {
            $scope.collections = data.collections;
            console.log(data);
        });
        console.log("fuck");
    }
]);
app.controller("CreateCollectionController", ["$scope", "Collection", "$state",
    function ($scope, Collection, $state) {
        $scope.collectionType = 'public';
        $scope.collectionName = '';
        $scope.collectionDescription = '';

        $scope.submit = function () {
            var isPublic = $scope.collectionType === "public";
            Collection.create({
                isPublic: isPublic,
                name: $scope.collectionName,
                description: $scope.collectionDescription
            }).then(function (data) {
                var collectionId = data.id;
                $state.go('collection.edit', {collection: collectionId});
                // console.log(collectionId);
            });
        };


    }
]);
app.controller("EditCollectionController", ["$scope", "$stateParams", "$uibModal", "Collection",
    function ($scope, $stateParams, $uibModal, Collection) {
        console.log($stateParams.collection);

        function fetchCollection() {
            Collection.getOne($stateParams.collection).then(function (data) {
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionType = data.collection.is_public ? "public" : "private";
                console.log(data.collection);
            });
        }

        fetchCollection();

        $scope.addNewWord = function () {

            var groupModal = $uibModal.open({
                animation: true,
                templateUrl: '/static/app/collection/add-word.html',
                controller: 'AddWordController',
                size: "lg",
                resolve: {
                    collectionId: function () {
                        return $stateParams.collection;
                    }
                }
            });

            groupModal.result.then(function () {
                console.log("Done");
                fetchCollection();
            });
        };

        $scope.removeWord = function (wordId) {
            Collection.removeWord({collectionId: $scope.collection._id, wordId: wordId}).then(function (data) {
                fetchCollection();
            });
        };

        $scope.update = function () {
            console.log("aris");
            Collection.update({
                collectionId: $stateParams.collection,
                name: $scope.collectionName,
                description: $scope.collectionDescription
            }).then(function (status) {
                fetchCollection();
            });
        };
    }
]);
app.controller("MyCollectionController", ["$scope","Collection",
    function ($scope, Collection, AuthService) {
        Collection.getUserCollections().then(function (data) {
            $scope.collections = data.collections;
            console.log(data);
        });
        console.log("fuck");
    }
]);
app.controller("ViewCollectionController", ["$scope", "Collection", "$stateParams",
    function ($scope, Collection, $stateParams) {
        Collection.getOne($stateParams.collection).then(function (data) {
            $scope.collection = data.collection;
            console.log(data.collection);
        });
    }
]);
app.controller("ProfileController", ['$scope', 'AuthService', '$location', '$rootScope',
    function ($scope, AuthService, $location, $rootScope) {
        $scope.hasFacebook = AuthService.facebook.name !== null;
        $scope.facebookName = AuthService.facebook.name;
        $scope.localEmail = AuthService.local.email;
        $scope.localUserName = AuthService.local.username;
    }
]);
app.controller('HeaderController', function ($scope, $rootScope, AuthService, $state) {
    $scope.authenticated = AuthService.authenticated;
    $scope.$on('authentication', function () {
        $scope.authenticated = AuthService.authenticated;
    });
    $scope.headerLinks = [
        {title: "მთავარი", state: "app", active: false},
        {title: "როგორ მუშაობს", state: "how-it-works", active: false},
        {title: "კოლექციები", state: "collection.list", active: false}
    ];
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        //console.log(toState);
        var i;
        for (i = 0; i < $scope.headerLinks.length; i++) {
            $scope.headerLinks[i].active = $scope.headerLinks[i].state === toState.name;
        }
    });

    $scope.logOut = function () {
        AuthService.logOut(function (status) {
            if (status) {
                $state.go('app');
                $scope.authenticated = AuthService.authenticated;
            }
        });
    };
});
app.controller('HomeController', ['$scope', '$uibModal', '$log',
    function ($scope, $uibModal, $log) {

    }
]);
app.controller("PracticeController", ["$scope", "$timeout", "$stateParams", "$http", "Collection",
    function ($scope, $timeout, $stateParams, $http, Collection) {
        var words = [];

        var currentWordPair = null, wordList = [];


        function timeString(time) {
            var minutes = Math.floor(time / 60);
            var seconds = time - minutes * 60;
            var timeString = ('0' + minutes.toString()).slice(-2) + ":" + ('0' + seconds.toString()).slice(-2);
            console.log(timeString);
            return timeString;
        }

        function resetWordList() {
            words = [];
            wordList.forEach(function (e) {
                words.push(e);
            });
        }

        function initScope() {
            $scope.remainingTime = $scope.fullTime + 1;
            $scope.countDown = 4;
            $scope.currentStage = 0;
            $scope.counter = 0;
            $scope.correct = 0;
            $scope.wrong = 0;
            $scope.tick = null;
            currentWordPair = null;
            $scope.practiceTime = timeString($scope.fullTime);
            $scope.inputWord = "";
            resetWordList();
        }

        Collection.getOne($stateParams.collection).then(function (data) {
            $scope.collection = data.collection;
            $scope.collectionName = data.collection.name;
            console.log(data.collection);
            wordList = data.collection.words;
            $scope.fullTime = wordList.length * 9;
            initScope();
        });


        function countDownFunc() {
            if ($scope.countDown > 1) {
                $scope.countDown -= 1;
                $timeout(countDownFunc, 1000);
            } else {
                $scope.currentStage = 2;
                stageLoop();
            }

        }

        $scope.getPoints = function () {
            var cw = $scope.correct + $scope.wrong;
            if (cw == 0) {
                return 0;
            }
            if ($scope.correct == 0) {
                return 0;
            }
            return Math.floor($scope.correct / cw * 1000) / 10;
        };

        function getRandomWord() {
            var i = Math.floor(Math.random() * words.length);
            var w = words.splice(i, 1);
            console.log(w);
            //  $scope.currentWordIndex = i;
            currentWordPair = w[0];
            $scope.currentWord = currentWordPair.description;
        }

        $scope.checkWord = function () {
            if ($scope.inputWord === currentWordPair.value) {
                $scope.correct += 1;
            } else {
                $scope.wrong += 1;
                words.push(currentWordPair);
            }

            if (words.length === 0) {
                $scope.currentStage = 3;
                $timeout.cancel($scope.tick);
                stageLoop();
            } else {
                getRandomWord();
                $scope.inputWord = "";
                document.getElementById("inputWord").focus();
            }
        };

        function timeTicker() {
            if ($scope.remainingTime > 1) {
                $scope.remainingTime -= 1;
                $scope.tick = $timeout(timeTicker, 1000);
            } else {
                $scope.currentStage = 3;
            }
        }

        function roundStart() {
            timeTicker();
            getRandomWord();

        }

        function timeIsUp() {
            //todo: post activity stats to server
        }

        var stageLoop = function () {

            if ($scope.currentStage === 0) {
                $scope.currentStage = 1;
                stageLoop();
                return;
            }

            if ($scope.currentStage === 1) {
                countDownFunc();
            }
            if ($scope.currentStage === 2) {
                roundStart();
            }
            if ($scope.currentStage === 3) {
                timeIsUp();
            }

        };

        $scope.start = function () {
            stageLoop();
        };

        //stageLoop(); //todo:remove this

        $scope.destroy = function () {
            $timeout.cancel($scope.tick);
        };

        function resetScope() {
            initScope();
        }

        $scope.again = function () {
            resetScope();
        };

    }
]);
app.factory("WordService", ["$http",
    function ($http) {
        var wordPath = "/api/word/";
        var WordService = {};
        WordService.find = function (word) {
            return $http.post(wordPath + "find", {value: word}).then(function (resp) {
                return resp.data.data;
            });
        };

        return WordService;
    }
]);