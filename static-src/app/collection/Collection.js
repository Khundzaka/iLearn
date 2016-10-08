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
            $log(params);
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