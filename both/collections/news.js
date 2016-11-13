News = new Mongo.Collection('news');
News.allow({
    'insert': function(userId, doc) {
        return true;
    }
});
