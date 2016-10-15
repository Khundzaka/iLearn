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