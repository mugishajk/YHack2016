News = new Mongo.Collection('news');
News.allow({
    'insert': function(userId, doc) {
        return true;
    },
    'update': function(userId, doc) {
        return true;
    }
});
