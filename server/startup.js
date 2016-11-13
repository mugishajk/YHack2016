Meteor.startup(function() {

    Accounts.onCreateUser(function(options, user) {

        if (options.profile) {
            // include the user profile
            user.profile = options.profile
        }


        user.picture = "/images/profile.jpg";
        user.wallet = 100.0;



        return user;
    });

    //if there are no users in the collection, seed one
    if (Meteor.users.find({})
        .count() == 0) {
        console.log("No user found");
        Meteor.call('seedUser');
    }


});
