var Irregular = require("../models/irregular");
var Promise = require("bluebird");

var IrregularRepository = {};

IrregularRepository.create = function (params, callback) {
    var description = params.description;
    var form_one = params.form_one;
    var form_two = params.form_two;
    var form_three = params.form_three;

    var irregular = new Irregular({
        form_one: form_one,
        form_two: form_two,
        form_three: form_three,
        description: description
    });
    irregular.save(function (err) {
        callback(err, irregular);
    });
};

IrregularRepository.list = function (callback) {
    Irregular.find({active: true}).exec(function (err, topics) {
        return callback(err, topics);
    });
};

IrregularRepository.find = function (params, callback) {
    Irregular.find({$text: {$search: params.value}}).exec().then(function (irregulars) {
        return callback(null, irregulars);
    }).catch(function (err) {
        return callback(err);
    });
};

IrregularRepository.one = function (params, callback) {
    Irregular.findById(params.uid).exec(function (err, irregular) {
        if (err) {
            return callback(err);
        }
        if (!irregular) {
            return callback(new Error("Word Not Found"));
        }
        return callback(err, irregular);
    });
};

IrregularRepository.modify = function (params, callback) {
    Irregular.findById(params.uid).exec(function (err, irregular) {
        if (err) {
            return (err);
        }
        irregular.form_one = params.form_one;
        irregular.form_two = params.form_two;
        irregular.form_three = params.form_three;
        irregular.description = params.description;

        irregular.save(function (err) {
            callback(err, irregular);
        });
    });
};

module.exports = {IrregularRepository: IrregularRepository};