var Account = require("../models/account"),
    Collection = require("../models/collection"),
    Word = require("../models/word"),
    ForumPost = require("../models/forum_post"),
    PracticeResult = require("../models/practice_result"),
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

StatsRepository.practicesCount = function () {
    return PracticeResult.count().exec();
};

StatsRepository.practicesToday = function () {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return PracticeResult.where('created_at').gt(now).count().exec();
};

StatsRepository.postsCount = function () {
    return ForumPost.count().exec();
};

StatsRepository.postsToday = function () {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return ForumPost.where('created_at').gt(now).count().exec();
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
        usersToday: StatsRepository.usersToday(),
        practicesCount: StatsRepository.practicesCount(),
        practicesToday: StatsRepository.practicesToday(),
        postsCount: StatsRepository.postsCount(),
        postsToday: StatsRepository.postsToday()
    });
};

module.exports = {StatsRepository: StatsRepository};