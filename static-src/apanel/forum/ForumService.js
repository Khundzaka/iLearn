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
                $log.log("found");
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