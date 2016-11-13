Stocks = new Mongo.Collection('stocks');
Stocks.allow({
    'insert': function(userId, doc) {
        return true;
    }
});
