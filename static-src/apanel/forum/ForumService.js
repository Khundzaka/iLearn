apanelApp.factory("ForumService", ["$http", "$log",
    function ($http, $log) {
        var ForumService = {};
        var getListEndpoint = "/apanel/api/forum";
        var newTopicEndpoint = "/apanel/api/forum/";
        var updateTopicEndpoint = "/apanel/api/forum/";
        var getOneApiEndpoint = "/api/forum/topic/one/";

        ForumService.getTopicList = function () {
            return $http.get(getListEndpoint).then(function (response) {
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
                active: params.active,
                uid: params.uid
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        ForumService.update = function (title, description, active, topic_id) {
            var value = {
                title: title,
                description: description,
                active: active,
                uid: topic_id
            };
            $log.log(value);
            return $http.put(updateTopicEndpoint, value).then(function (response) {
                return response.data.status;
            });
        };

        return ForumService;
    }
]);