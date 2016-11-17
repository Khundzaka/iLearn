var PracticeResult = require("../models/practice_result");
var Collection = require("../models/collection");
var async = require("async");

var PracticeRepository = {};

PracticeRepository.saveResult = function (params, callback) {

    var practiceData = params.practiceData;
    var collectionId = practiceData.collection;
    var user = params.user;

    function getCollection(cb) {
        Collection.findById(collectionId).exec().then(function (collection) {
            return cb(err, collection);
        });
    }

    function getWordsList(collection, cb) {
        var wordsList = [];
        cb(null, collection, wordsList);
    }

    function createPracticeResult(collection, wordsList, cb) {
        var result = new PracticeResult();
        result._collection = collection._id;
        result.user = user._id;
        result.mistakes = practiceData.mistakes;
        result.coins = 0; //todo: change when we will create coins module
        result.points = practiceData.points;
        result.spent = practiceData.spent;
        result.correct = practiceData.correct;
        result.wrong = practiceData.wrong;
        result.save(function (err) {
            return cb(err, result);
        });
    }

    async.waterfall([
        getCollection,
        getWordsList,
        createPracticeResult
    ], function (err, result) {
        return callback(err, result);
    });
};

module.exports = {PracticeRepository: PracticeRepository};