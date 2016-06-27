var PracticeResult = require("../models/practice_result");
var Collection = require("../models/collection");
var async = require("async");

var PracticeRepository = {};

PracticeRepository.saveResult = function (params, callback) {

    var practiceData = params.practiceData;
    var collectionId = practiceData.collectionId;
    var user = params.user;

    function getCollection(cb) {
        Collection.findById(collectionId).exec(function (err, collection) {
            return cb(err, collection);
        });
    }
    
    function getWordsList(collection, cb) {
        var wordsList = [];
        cb(err, collection, wordsList);
    }
    
    function createPracticeResult(collection, wordsList, cb){
        var result = new PracticeResult();
        result.collection = collection._id;
        result.user = user._id;
        result.mistakes = practiceData.mistakes;
        result.coins = 0; //todo: change when we will create coins module
        result.points = practiceData.points;
        //todo: finish this shit!
    }

    async.waterfall([
        getCollection,
        getWordsList,
        createPracticeResult
    ], function (err, result) {
        if (err) {
            return callback(err);
        }
        return callback(result);
    });
    return callback(result);
};

module.exports = {PracticeRepository: PracticeRepository};