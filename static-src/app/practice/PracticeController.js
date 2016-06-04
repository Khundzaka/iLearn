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