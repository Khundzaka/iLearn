var Word = require("../models/word");
var Promise = require("bluebird");

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

WordRepository.list = function (params) {
    var page = params.page || 1;
    var limit = params.limit || 5;
    var skip = (page - 1) * limit || 0;
    var query = Word.find().skip(skip).limit(parseInt(limit)).sort({'_id': -1});
    return Promise.props({
        words: query.exec(),
        page: page,
        count: Word.count().exec()
    });
};

WordRepository.find = function (params, callback) {
    //todo: problem with bluebird, find out why
    Word.find({$text: {$search: params.value}}).exec().then(function (words) {
        return callback(null, words);
    }).catch(function (err) {
        return callback(err);
    });
};

WordRepository.one = function (params, callback) {
    Word.findById(params.uid).exec(function (err, word) {
        if (err) {
            return callback(err);
        }
        if (!word) {
            return callback(new Error("Word Not Found"));
        }
        return callback(err, word);
    });
};

WordRepository.pending = function (callback) {
    Word.find({checked: false}).exec(function (err, words) {
        callback(err, words);
    })
};

WordRepository.validate = function (params, callback) {
    Word.findById(params.uid).exec(function (err, word) {
        if (err) {
            return (err);
        }
        word.checked = true;
        word.accepted = params.accepted;

        word.save(function (err) {
            callback(err, word);
        });
    });
};

WordRepository.modify = function (params, callback) {
    Word.findById(params.uid).exec(function (err, word) {
        if (err) {
            return (err);
        }
        word.checked = true;
        word.accepted = true;
        word.value = params.value;
        word.description = params.description;

        word.save(function (err) {
            callback(err, word);
        });
    });
};

module.exports = {WordRepository: WordRepository};