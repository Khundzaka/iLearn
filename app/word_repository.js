var Word = require("../models/word");

var WordRepository = {};

WordRepository.create = function (params, callback) {
    var author = params.user;
    var description = params.description;
    var value = params.value;

    var word = new Word({author: author, description: description, value: value});
    word.save(function (err) {
        callback(err, word);
    });
};

WordRepository.find = function (params, callback) {
    Word.find({value: params.value}).exec(function (err, words) {
        callback(err, words);
    })
};

module.exports = {WordRepository: WordRepository};