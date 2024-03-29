app.controller("PracticeController", [
    "$scope", "$timeout", "$state", "$stateParams", "$http", "Collection", "AuthService", "$log",
    function ($scope, $timeout, $state, $stateParams, $http, Collection, AuthService, $log) {
        var words = [];
        var mistakesList = [];
        var startDate = null;

        $scope.mistakesFinal = {};
        // $scope.focused = true; //
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

        function findWord(elements, el) {
            var filtered = elements.filter(function (e) {
                return e.word === el;
            });
            if (filtered.length === 1) {
                return filtered[0];
            } else {
                return null;
            }
        }

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
            // $log.log(timeString);
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

            if (!$scope.collection.is_public && AuthService.uid != $scope.collection.author._id) {
                $state.go("collection.list");
            }

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
            if ($scope.inputWord.toLowerCase() === currentWordPair.value.toLowerCase()) {
                $scope.correct += 1;
                showMessage(true);
            } else {
                showMessage(false);
                $scope.wrong += 1;
                //check if word is already in mistakes
                if (mistakesList.indexOf(currentWordPair._id) < 0) {
                    words.push(currentWordPair);
                }
                mistakesList.push(currentWordPair._id);
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
            startDate = new Date();
        }

        function timeIsUp() {
            //todo: post activity stats to server
            var intSpent = Math.ceil(((new Date()).getTime() - startDate.getTime()) / 1000);
            var timeSpent = timeString(intSpent);
            var mistakes = [];
            mistakesList.forEach(function (el) {
                var mistake = findWord(mistakes, el);
                if (mistake != null) {
                    mistake.count += 1;
                } else {
                    mistakes.push({word: el, count: 1});
                }
            });

            $log.log(timeSpent);
            $scope.timeSpent = timeSpent;

            $http.post("/api/practice/submit", {
                collection: $stateParams.collection,
                spent: intSpent,
                mistakes: mistakes,
                correct: $scope.correct,
                wrong: $scope.wrong,
                points: $scope.getPoints()
            }).then(function (res) {
                $scope.mistakesFinal = res.data.data.result.mistakes;
            });
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