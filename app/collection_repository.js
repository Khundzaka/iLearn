var Collection = require("../models/collection");
var Word = require("../models/word");
var async = require("async");

var CollectionRepository = {};

CollectionRepository.getCollection = function (params) {
    var user = params.user;
    var collectionId = params.collectionId;
    return function (cb) {
        Collection.findById(collectionId).exec(function (err, collection) {
            if (!err) {
                if (!collection.author.equals(params.user._id)) {
                    console.dir(collection.author);
                    console.dir(params.user._id);
                    return cb(new Error("user doesn't match", "user_not_match"));
                }
            }
            return cb(err, collection);
        });
    };
};

CollectionRepository.getAll = function (callback) {
    Collection.find({}).exec(function (err, collections) {
        if (err) {
            return callback(err);
        }
        callback(null, collections);
    });
};

Collection.getAcceptedPublic = function (callback) {
    Collection.find({is_public: true, accepted: true}).exec(function (err, collections) {
        if (err) {
            return callback(err);
        }
        callback(null, collections);
    });
};


CollectionRepository.getUserCollections = function (params, callback) {
    var userId = params.user._id;
    // console.dir(params);
    Collection.find({author: userId}).exec(function (err, collections) {
        callback(err, collections);
    });
};

CollectionRepository.getOne = function (parameters, callback) {
    var collectionId = parameters.collectionId;
    Collection.findById(collectionId).populate("words author").exec(function (err, collection) {
        if (err) {
            return callback(err);
        }
        callback(null, {collection: collection});
    });
};

CollectionRepository.create = function (params, callback) {
    var data = params.data;
    var name = data.name;
    var isPublic = data.isPublic;
    var description = data.description;
    var user = params.user;
    var newCollection = Collection({
        checked: false,
        accepted: false,
        name: name,
        is_public: isPublic,
        author: user._id,
        description: description
    });
    newCollection.save(function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, newCollection);
    });
};

CollectionRepository.update = function (params, callback) {
    var data = params.data;
    var name = data.name;
    // var shared = params.shared;
    // var user = params.user;
    var description = data.description;
    var collectionId = data.collectionId;
    var user = params.user;

    //todo: check if collection owns that user

    Collection.findById(collectionId).exec(function (err, collection) {
        if (err) {
            return callback(err);
        }

        if (!collection.author.equals(user._id)) {
            return callback(new Error("user doesn't match", "user_not_match"));
        }

        collection.name = name;
        collection.description = description;
        collection.save(function (error) {
            return callback(error, collection);
        });
    });
};

CollectionRepository.addWord = function (params, callback) {
    var wordId = params.wordId;
    var collectionId = params.collectionId;
    var user = params.user;

    function getWord(collection, cb) {
        Word.findById(wordId).exec(function (err, word) {
            return cb(err, collection, word);
        });
    }

    function processData(err, collection, word) {
        if (err) {
            return callback(err);
        }
        collection.words.push(word._id);
        collection.save(function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }

    async.waterfall([
        CollectionRepository.getCollection({user: user, collectionId: collectionId}),
        getWord
    ], processData);
};

CollectionRepository.removeWord = function (params, callback) {
    var wordId = params.wordId;
    var collectionId = params.collectionId;
    var user = params.user;

    function getWord(collection, cb) {
        Word.findById(wordId).exec(function (err, word) {
            return cb(err, collection, word);
        });
    }

    function processData(err, collection, word) {
        if (err) {
            return callback(err);
        }
        var ind = collection.words.indexOf(word._id);

        if (ind < 0) {
            return callback(new Error("No such word in collection"));
        }

        collection.words.splice(ind, 1);

        collection.save(function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }

    async.waterfall([
        CollectionRepository.getCollection({user: user, collectionId: collectionId}),
        getWord
    ], processData);
};


CollectionRepository.addNewWord = function (params, callback) {
    var passedWord = params.word;
    var collectionId = params.collectionId;
    passedWord.author = params.user._id;
    passedWord.checked = false;
    passedWord.accepted = false;
    var user = params.user;

    function createWord(collection, cb) {
        var word = new Word(passedWord);
        word.save(function (err) {
            return cb(err, collection, word);
        });
    }

    function processData(err, collection, word) {
        if (err) {
            return callback(err);
        }
        collection.words.push(word._id);

        collection.save(function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }

    async.waterfall([
        CollectionRepository.getCollection({user: user, collectionId: collectionId}),
        createWord
    ], processData);
};

CollectionRepository.pending = function (callback) {
    Collection.find({checked: false, is_public: true}).exec(function (err, collections) {
        callback(err, collections);
    });
};

CollectionRepository.validate = function (params, callback) {
    Collection.findById(params.uid).exec(function (err, collection) {
        if (err) {
            return (err);
        }
        collection.checked = true;
        collection.accepted = params.accepted;
        collection.name = params.name;
        collection.description = params.description;

        collection.save(function (err) {
            callback(err, collection);
        });
    });
};


module.exports = {CollectionRepository: CollectionRepository};