Content = new Mongo.Collection('content');
Content.allow({
    'insert': function(userId, doc) {
        return true;
    }
});
