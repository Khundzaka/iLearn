var Collection = require("../models/collection");
var Word = require("../models/word");
var async = require("async");

var CollectionRepository = {};

CollectionRepository.getAll = function (callback) {
    Collection.find({is_public: true}).exec(function (err, collections) {
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
    var newCollection = Collection({name: name, is_public: isPublic, author: user._id, description: description});
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

    function getCollection(cb) {
        Collection.findById(collectionId).exec(function (err, collection) {
            return cb(err, collection);
        });
    }

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

    async.waterfall([getCollection, getWord], processData);
};

CollectionRepository.removeWord = function (params, callback) {
    var wordId = params.wordId;
    var collectionId = params.collectionId;

    function getCollection(cb) {
        Collection.findById(collectionId).exec(function (err, collection) {
            return cb(err, collection);
        });
    }

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

    async.waterfall([getCollection, getWord], processData);
};


CollectionRepository.addNewWord = function (params, callback) {
    var passedWord = params.word;
    var collectionId = params.collectionId;
    passedWord.author = params.user._id;

    function getCollection(cb) {
        Collection.findById(collectionId).exec(function (err, collection) {
            return cb(err, collection);
        });
    }

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

    async.waterfall([getCollection, createWord], processData);
};


module.exports = {CollectionRepository: CollectionRepository};