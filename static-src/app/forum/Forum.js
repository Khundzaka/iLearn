app.factory("Forum", ["$http",'$log',
    function ($http,$log) {
        var forumPath = "/api/forum/";
        var Forum = {};
        Forum.getTopicList = function () {
            return $http.get(forumPath).then(function (resp) {
                return resp.data.data;
            });
        };
        Forum.getTopicPosts = function (topicId) {
            return $http.get(forumPath + topicId).then(function (resp) {
                return resp.data.data;
            });
        };

        Forum.createPost = function (params) {

            return $http.post(forumPath, {
                topicId: params.topicId,
                text: params.text
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        Forum.create = function (params) {
            var name = params.name;
            var description = params.description;
            var isPublic = params.isPublic;

            return $http.post(forumPath, {
                name: name,
                isPublic: isPublic,
                description: description
            }).then(function (resp) {
                return resp.data.data;
            });

        };

        Forum.update = function (params) {
            var name = params.name;
            var description = params.description;
            var collectionId = params.collectionId;

            return $http.put(forumPath, {
                name: name,
                description: description,
                collectionId: collectionId
            }).then(function (resp) {
                return resp.data.status;
            });

        };

        Forum.addWord = function (params) {
            var collectionId = params.collectionId;
            var wordId = params.wordId;
            $log(params);
            return $http.post(forumPath + "word/add", {
                collectionId: collectionId,
                wordId: wordId
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        Forum.removeWord = function (params) {
            var collectionId = params.collectionId;
            var wordId = params.wordId;
            return $http.post(forumPath + "word/remove", {
                collectionId: collectionId,
                wordId: wordId
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        Forum.addNewWord = function (params) {
            var collectionId = params.collectionId;
            var wordName = params.wordName;
            var wordDescription = params.wordDescription;
            return $http.post(forumPath + "word/new", {
                collectionId: collectionId,
                wordName: wordName,
                wordDescription: wordDescription
            }).then(function (resp) {
                return resp.data.data;
            });
        };

        return Forum;
    }
]);