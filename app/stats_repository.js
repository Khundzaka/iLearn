var Account = require("../models/account"),
    Collection = require("../models/collection"),
    Word = require("../models/word"),
    ForumPost = require("../models/forum_post"),
    Promise = require("bluebird");

var StatsRepository = {};

StatsRepository.wordsCount = function () {
    return Word.count().exec();
};

StatsRepository.wordsToday = function () {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Word.where('created_at').gt(now).count().exec();
};

StatsRepository.wordsUnchecked = function () {
    return Word.where('checked').equals(false).count().exec();
};

StatsRepository.collectionsCount = function () {
    return Collection.count().exec();
};

StatsRepository.collectionsToday = function () {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Collection.where('created_at').gt(now).count().exec();
};

StatsRepository.collectionsUnchecked = function () {
    return Collection
        .where('checked').equals(false)
        .where('is_public').equals(true)
        .count().exec();
};

StatsRepository.usersCount = function () {
    return Account.count().exec();
};

StatsRepository.usersToday = function () {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Account.where('created_at').gt(now).count().exec();
};

StatsRepository.summary = function () {
    return Promise.props({
        wordsCount: StatsRepository.wordsCount(),
        wordsToday: StatsRepository.wordsToday(),
        wordsUnchecked: StatsRepository.wordsUnchecked(),
        collectionsCount: StatsRepository.collectionsCount(),
        collectionsToday: StatsRepository.collectionsToday(),
        collectionsUnchecked: StatsRepository.collectionsUnchecked(),
        usersCount: StatsRepository.usersCount(),
        usersToday: StatsRepository.usersToday()
    });
};

module.exports = {StatsRepository: StatsRepository};