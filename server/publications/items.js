Meteor.publishComposite("items", function() {
    return {
        find: function() {
            return Items.find({});
        }

    }
});
Meteor.publishComposite("news", function() {
    return {
        find: function() {
            return Items.find({});
        }

    }
});
Meteor.publishComposite("questions", function() {
    return {
        find: function() {
            return Items.find({});
        }

    }
});
Meteor.publishComposite("content", function() {
    return {
        find: function() {
            return Items.find({});
        }

    }
});
