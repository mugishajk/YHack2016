Template.intro.rendered = function() {
    console.log("rendered");
    Session.set('introPart', 1);
    $('#part1')
        .show();
    $('#part2')
        .hide();
    $('#part3')
        .hide();
};

Template.intro.events({
    'click #leftArrow': function(event) {
        console.log("left Arrow clicked");
        var part = Session.get('introPart');
        console.log("We're at part: " + part);
        if (part == 3) {
            Session.set('introPart', 2);
            $('#part2')
                .hide();
            $('#part1')
                .hide();
            $('#part3')
                .show();

        } else if (part == 2) {
            Session.set('introPart', 1);
            $('#part1')
                .hide();
            $('#part3')
                .hide();
            $('#part2')
                .show();

        } else {
            Session.set('introPart', 3);
            $('#part2')
                .hide();
            $('#part3')
                .hide();
            $('#part1')
                .show();

        }
    },
    'click #toLesson': function(event) {
        Router.go('/lesson');
    },
    'click #rightArrow': function(event) {
        var part = Session.get('introPart');
        console.log("We're at part: " + part);
        if (part == 1) {
            Session.set('introPart', 2);
            $('#part1')
                .hide();
            $('#part3')
                .hide();
            $('#part2')
                .show();
        } else if (part == 2) {
            Session.set('introPart', 3);
            $('#part1')
                .hide();
            $('#part2')
                .hide();
            $('#part3')
                .show();
        } else {
            Session.set('introPart', 1);
            $('#part2')
                .hide();
            $('#part3')
                .hide();
            $('#part1')
                .show();
        }
    }
});

Template.intro.helpers({
    holder: function() {
        var part = Session.get('introPart');

        if (part == 3) {
            return true;
        } else {
            return false;
        }
    }
});
