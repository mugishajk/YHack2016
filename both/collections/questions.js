Questions = new Mongo.Collection('questions');

Questions.allow({
    'insert': function(userId, doc) {
        return true;
    }
});
