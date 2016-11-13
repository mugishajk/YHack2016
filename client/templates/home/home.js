Template.home.rendered = function() {

};

Template.home.events({
    'click #start': function(event) {
        event.preventDefault();
        Router.go('/intro');
    },
    'click #about': function(event) {
        event.preventDefault();
        Router.go('/about');
    }
});
