GeneralController = AppController.extend({
    waitOn: function() {
        this.subscribe('news');
        this.subscribe('content');
        this.subscribe('questions');
        this.subscribe('stocks');
    }
});
