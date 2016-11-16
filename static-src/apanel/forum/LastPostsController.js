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