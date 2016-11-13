Content = new Mongo.Collection('content');
Content.allow({
    'insert': function(userId, doc) {
        return true;
    },
    'update': function(userId, doc) {
        return true;
    }
});
