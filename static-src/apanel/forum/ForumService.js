apanelApp.factory("ForumService",["$http","$log",
    function ($http,$log) {
        var ForumService={};
        var getListEndpoint="GET/apanel/api/forum";
        var newTopicEndpoint="POST/apanel/api/forum/";
        var updateTopicEndpoint="PUT/apanel/api/forum/";

        ForumService.getTopicList = function() {
            return $http.get(getListEndpoint).then(function (response) {
                $log.log(response);
                return response.data.data;
            });
        };

        ForumService.addNewTopic = function (params) {
            var title=params.title;
            var description=params.description;
            var active=params.active;

            return $http.post(newTopicEndpoint, {
                title: title,
                description: description,
                active:active
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        ForumService.update = function (title,description,active,topic_id) {
            return $http.put(updateTopicEndpoint, {
                title: title,
                description: description,
                active:active,
                uid:topic_id
            }).then(function (response) {
                return response.data.status;
            });
        };

        return ForumService;
    }
]);