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
            url: "/forum/topic/:topicId",
            data: {requireLogin: true, pageTitle: "ფორუმი"},
            templateUrl: _st + "forum/topic.html",
            controller: "TopicController"
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
app.factory("AuthService", ['$http','$log',
    function ($http,$log) {
        var AuthService = {
            authenticated: false,
            uid: null,
            local: {
                username: null,
                email: null
            },
            facebook: {
                name: null,
                email: null
            }
        };

        AuthService.setDefault = function () {

            AuthService.authenticated = false;

            AuthService.local = {
                username: null,
                email: null
            };

            AuthService.facebook = {
                name: null,
                email: null
            };

            AuthService.uid = null;
        };

        AuthService.logIn = function (email, password, callback) {
            $http.post("/local/login", {email: email, password: password}).then(function (res) {
                if (res.data.status != "failed") {
                    // console.log(res.data);
                    var userData = res.data.user;
                    if (userData.local) AuthService.local = userData.local;
                    if (userData.facebook) AuthService.facebook = userData.facebook;
                    AuthService.authenticated = true;
                    AuthService.uid = userData._id;
                    //console.log("aqac var");
                    callback(null);
                }
                else {
                    callback(true, res.data.info);
                }
            });
        };
        AuthService.register = function (params, callback) {
            var email = params.email, password = params.password, username = params.username;
            $http.post("/local/register", {email: email, password: password, username: username}).then(function (res) {
                if (res.data.status != "failed") {
                    // console.log(res.data);
                    var userData = res.data.user;
                    if (userData.local) AuthService.local = userData.local;
                    if (userData.facebook) AuthService.facebook = userData.facebook;
                    AuthService.authenticated = true;
                    AuthService.uid = userData._id;
                    //console.log("aqac var");
                    callback(null);
                } else {
                    callback(true, res.data.info);
                }
            });
        };

        AuthService.logOut = function (callback) {
            $http.get("/local/logout").then(function (res) {
                if (res.data.status === "ok") {
                    AuthService.setDefault();
                    return callback(true);
                }
            });
        };

        AuthService.startUp = function () {
            if (typeof startUpUserData === 'undefined') startUpUserData = false;
            var userData = startUpUserData;
            if (userData) {
                userData = JSON.parse(userData);
                // console.log(userData.facebook);
                if (userData.local) this.local = userData.local;
                if (userData.facebook) this.facebook = userData.facebook;
                AuthService.authenticated = true;
                AuthService.uid = userData._id;
            }
        };

        return AuthService;
    }
]);
app.controller("LoginController", ['$scope', 'AuthService', '$state', '$rootScope', 'InfoModal',
    function ($scope, AuthService, $state, $rootScope, InfoModal) {
        $scope.email = "";
        $scope.password = "";

        $scope.loginSubmit = function () {
            AuthService.logIn($scope.email, $scope.password, function (error) {
                if (!error) {
                    $rootScope.$broadcast('authentication', 'login');
                    $state.go("dashboard.profile");
                }
                else {
                    InfoModal.show({message: "ელ.ფოსტა ან პაროლი არასწორია"});
                }
            });
        }
    }
]);
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
app.controller("AddWordController", ["$scope", "Collection", "WordService", "collectionId", "$uibModalInstance", "InfoModal",'$log',
    function ($scope, Collection, WordService, collectionId, $uibModalInstance, InfoModal,$log) {
        $scope.wordName = "";
        $scope.wordDescription = "";
        $scope.words = [];
        $scope.noWordsFound = false;
        //console.log(collectionId);
        $scope.findInput = "";
        $scope.addNewWord = function () {
            var valid = $scope.wordName != "" && $scope.wordDescription != "";
            if (valid) {
                Collection.addNewWord({
                    collectionId: collectionId,
                    wordName: $scope.wordName,
                    wordDescription: $scope.wordDescription
                }).then(function (data) {
                    $log.log(data);
                    $uibModalInstance.close();
                });
            }
            else {
                InfoModal.show({message: "შეავსეთ ყველა ველი"});
            }
        };

        $scope.addWord = function (wordId) {
            Collection.addWord({wordId: wordId, collectionId: collectionId}).then(function (data) {
                $log.log(data);
                $uibModalInstance.close();
            });
        };

        $scope.find = function () {
            WordService.find($scope.findInput).then(function (data) {
                $scope.words = data.words;
                // check words count
                $scope.noWordsFound = $scope.words.length == 0;
            });
        };

        $scope.close = function () {
            $uibModalInstance.close();
        }
    }
]);
app.factory("Collection", ["$http",'$log',
    function ($http,$log) {
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
            $log.log(params);
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
app.controller("CollectionController", ["$scope","Collection","$log",
    function ($scope, Collection,$log) {
        Collection.getList().then(function (data) {
            $scope.collections = data.collections;
            $log.log(data);
        });
    }
]);
app.controller("CreateCollectionController", ["$scope", "Collection", "$state", "InfoModal",
    function ($scope, Collection, $state, InfoModal) {
        $scope.collectionType = 'public';
        $scope.collectionName = '';
        $scope.collectionDescription = '';

        $scope.submit = function () {
            var isPublic = $scope.collectionType === "public";
            if ($scope.collectionName == '') {
                InfoModal.show({title: "შეცდომა", message: "გთხოვთ შეავსოთ კოლექციის სახელი"});
                return;
            } else if ($scope.collectionDescription == '') {
                InfoModal.show({title: "შეცდომა", message: "გთხოვთ შეავსოთ კოლექციის აღწერა"});
                return;
            }
            Collection.create({
                isPublic: isPublic,
                name: $scope.collectionName,
                description: $scope.collectionDescription
            }).then(function (data) {
                var collectionId = data.id;
                $state.go('collection.edit', {collection: collectionId});
            });
        };


    }
]);
app.controller("EditCollectionController", ["$scope", "$stateParams", "$uibModal", "Collection", "$state", "AuthService","$log",
    function ($scope, $stateParams, $uibModal, Collection, $state, AuthService,$log) {
        $log.log($stateParams.collection);
        $scope.collectionTypeText = "";

        function fetchCollection() {
            Collection.getOne($stateParams.collection).then(function (data) {
                if(data.collection.author._id != AuthService.uid){
                    $state.go("collection.list");
                    // console.log(data.collection.author._id);
                    // console.log(AuthService.uid);
                }
                // console.log(data.collection.author._id);
                // console.log(AuthService.uid);
                $scope.collection = data.collection;
                $scope.collectionName = data.collection.name;
                $scope.collectionDescription = data.collection.description;
                $scope.collectionTypeText = data.collection.is_public ? "ღია კოლექცია" : "პირადი კოლექცია";
                $log.log(data.collection);
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
                fetchCollection();
            });
        };

        $scope.removeWord = function (wordId) {
            Collection.removeWord({collectionId: $scope.collection._id, wordId: wordId}).then(function (data) {
                fetchCollection();
            });
        };

        $scope.update = function () {
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
app.controller("MyCollectionController", ["$scope", "Collection", "$log",
    function ($scope, Collection, $log) {
        Collection.getUserCollections().then(function (data) {
            $scope.collections = data.collections;
            $log.log(data);
        });
    }
]);
app.controller("ViewCollectionController", ["$scope", "Collection", "$stateParams","$log",
    function ($scope, Collection, $stateParams,$log) {
        Collection.getOne($stateParams.collection).then(function (data) {
            $scope.collection = data.collection;
            $log.log(data.collection);
        });
    }
]);
app.controller("ProfileController", ['$scope', 'AuthService', '$location', '$rootScope', '$log',
    function ($scope, AuthService, $location, $rootScope, $log) {
        // $log.log(AuthService);
        $scope.hasFacebook = AuthService.facebook.name !== null;
        $scope.hasLocal = AuthService.local.email !== null;
        $scope.facebookName = AuthService.facebook.name;
        $scope.localEmail = AuthService.local.email;
        $scope.localUserName = AuthService.local.username;
    }
]);
app.controller('HeaderController', function ($scope, $rootScope, AuthService, $state, $log) {
    $scope.authenticated = AuthService.authenticated;
    $scope.navCollapsed = true;
    $scope.$on('authentication', function () {
        $scope.authenticated = AuthService.authenticated;
    });

    // $scope.headerLinks = [
    //     {title: "მთავარი", state: "app", active: false},
    //     {title: "ფორუმი", state: "forum", active: false},
    //     {title: "კოლექციები", state: "collection.list", active: false}
    // ];
    // $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    //     //$log.log(toState);
    //     var i;
    //     for (i = 0; i < $scope.headerLinks.length; i++) {
    //         $scope.headerLinks[i].active = $scope.headerLinks[i].state === toState.name;
    //     }
    // });
    //
    // $scope.goToState = function (state) {
    //     $scope.navCollapsed = true;
    //     $state.go(state);
    // };

    $scope.logOut = function () {
        AuthService.logOut(function (status) {
            if (status) {
                $state.go('app');
                $scope.authenticated = AuthService.authenticated;
            }
        });
    };
});
app.factory("Forum", ["$http", '$log',
    function ($http, $log) {
        var forumPath = "/api/forum/";
        var Forum = {};
        Forum.getTopicList = function () {
            return $http.get(forumPath).then(function (resp) {
                return resp.data.data;
            });
        };
        Forum.getTopicPosts = function (params) {
            var topicId = params.topicId;
            return $http.get(forumPath + "topic/posts/" + topicId).then(function (resp) {
                return resp.data.data;
            });
        };
        Forum.getOneTopic = function (params) {
            var topicId = params.topicId;
            return $http.get(forumPath + "topic/one/" + topicId).then(function (resp) {
                return resp.data.data;
            });
        };

        Forum.createPost = function (params) {

            return $http.post(forumPath + "post", {
                topicId: params.topicId,
                text: params.text
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        return Forum;
    }
]);
app.controller('ForumIndexController', ['$scope', '$uibModal', '$state', 'Forum', '$log',
    function ($scope, $uibModal, $state, Forum, $log) {
        // $scope.topics = [{
        //
        //     "title": "კითხვები ადმინისტრატორთან",
        //     "description": "აქ შეგიძლიათ დასვათ ნებისმიერი კითხვა და ადმინისტრაცია გაგცემთ პასუხს"
        // }, {
        //
        //     "title": "ტექნიკური ხარვეზები",
        //     "description": "თუ რაიმე პრობლემა შეგემნათ სერვისითსარგებლობისას, დაწერეთ აქ"
        // }
        //
        // ];
        //
        $scope.view = function (topicId) {
            $state.go("forum.topic", {topicId: topicId});
        }
        function fetchTopicList() {
            Forum.getTopicList().then(function (data) {
                $scope.topics = data.topics;
            });
        }
        fetchTopicList();

    }
]);
app.controller('TopicController', ['$scope', '$uibModal', '$log', '$stateParams', 'Forum',
    function ($scope, $uibModal, $log, $stateParams, Forum) {
        $scope.newPostText = "";
        $scope.posts = [];
        // $scope.topics = [{
        //     "_id": "123",
        //     "title": "კითხვები ადმინისტრატორთან",
        //     "description": "აქ შეგიძლიათ დასვათ ნებისმიერი კითხვა და ადმინისტრაცია გაგცემთ პასუხს"
        // }, {
        //     "_id": "456",
        //     "title": "ტექნიკური ხარვეზები",
        //     "description": "თუ რაიმე პრობლემა შეგემნათ სერვისითსარგებლობისას, დაწერეთ აქ"
        // }
        // ];
        function fetchTopic() {
            Forum.getOneTopic({topicId: $stateParams.topicId}).then(function (data) {
                $scope.topic = data.topic;
                $log.log(data);
            })

        }

        fetchTopic();

        function fetchPosts() {
            Forum.getTopicPosts({topicId: $stateParams.topicId}).then(function (data) {
               $scope.posts=data.posts;
            });
        }

        fetchPosts();

        $scope.createPost = function () {
            Forum.createPost({text: $scope.newPostText, topicId: $stateParams.topicId}).then(function () {
                $scope.newPostText = "";
                fetchPosts();
            });
        };


        // $log.log($stateParams.topicId);
        // $log.log("watafaq");
        // $scope.posts = [
        //     {
        //         author: "jemali",
        //         text: "klaviatura kompiuters sad aqvs?",
        //         date: new Date()
        //     },
        //     {
        //         author: "nodari",
        //         text: "kompiuters adiela rom gadavafaro da uknidan shevubero, interneti achqardeba?",
        //         date: new Date()
        //     }
        // ]
    }
]);
app.controller('HomeController', ['$scope', '$uibModal', '$log',
    function ($scope, $uibModal, $log) {

    }
]);
app.controller("PracticeController", ["$scope", "$timeout", "$state", "$stateParams", "$http", "Collection", "$log",
    function ($scope, $timeout, $state, $stateParams, $http, Collection, $log) {
        var words = [];
        var mistakesList = [];
        // $scope.focused = true;
        $scope.message = {
            show: false,
            correct: 0,
            timeout: null
        };
        $scope.isCapital = false; //todo: for future addons...

        var currentWordPair = null, wordList = [];

        $scope.goToCollection = function () {
            $state.go("collection.view", {collection: $stateParams.collection});
        };

        function showMessage(isCorrect) {
            $scope.message.correct = isCorrect;
            $scope.message.show = true;
            if ($scope.message.timeout) {
                $timeout.cancel($scope.message.timeout);
            }
            $scope.message.timeout = $timeout(function () {
                $scope.message.show = false;
            }, 600);
        }

        function timeString(time) {
            var minutes = Math.floor(time / 60);
            var seconds = time - minutes * 60;
            var timeString = ('0' + minutes.toString()).slice(-2) + ":" + ('0' + seconds.toString()).slice(-2);
            $log.log(timeString);
            return timeString;
        }

        function resetWordList() {
            words = [];
            wordList.forEach(function (e) {
                words.push(e);
            });
            mistakesList = [];
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
            $log.log(data.collection);
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
            var allWords = wordList.length;
            // console.log(allWords - $scope.correct, $scope.correct);
            var allAnswer = $scope.correct + $scope.wrong;
            if (allAnswer == 0) {
                return 0;
            }
            if ($scope.correct == 0) {
                return 0;
            }
            var skipped = allWords - $scope.correct;
            if (skipped < 0) {
                skipped = 0;
            }
            return Math.floor($scope.correct / (allAnswer + skipped) * 1000) / 10;
        };

        function getRandomWord() {
            var i = Math.floor(Math.random() * words.length);
            var w = words.splice(i, 1);
            //  $scope.currentWordIndex = i;
            currentWordPair = w[0];
            $scope.currentWord = currentWordPair.description;
        }

        function setFocus() {
            $timeout(function () {
                document.getElementById("inputWord").focus();
            });
        }

        $scope.checkWord = function () {
            if ($scope.inputWord === currentWordPair.value) {
                $scope.correct += 1;
                showMessage(true);
            } else {
                showMessage(false);
                $scope.wrong += 1;
                //check if word is already in mistakes
                if (mistakesList.indexOf(currentWordPair._id) < 0) {
                    mistakesList.push(currentWordPair._id);
                    words.push(currentWordPair);
                }
                $log.log(words.length);
            }

            if (words.length === 0) {
                $scope.currentStage = 3;
                $timeout.cancel($scope.tick);
                stageLoop();
            } else {
                getRandomWord();
                setFocus();
                $scope.inputWord = "";
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
            setFocus();
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
app.service("InfoModal", ["$uibModal", function ($uibModal) {
    return {
        show: function (passedData) {
            var message = passedData.message || "";
            var title = passedData.title || false;
            var size = passedData.size || "sm";

            $uibModal.open({
                animation: true,
                templateUrl: '/static/app/services/info-modal.html',
                controller: ["$scope", "passedObject", "$uibModalInstance",
                    function ($scope, passedObject, $uibModalInstance) {
                        $scope.message = passedObject.message;
                        $scope.title = passedObject.title;
                        $scope.close = function () {
                            $uibModalInstance.close();
                        }
                    }
                ],
                size: size,
                resolve: {
                    passedObject: function () {
                        return {message: message, title: title};
                    }
                }
            });
        }
    };
}]);
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