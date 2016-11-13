Meteor.methods({
    'seedUser': function() {
        console.log("Seed user called");
        Accounts.createUser({
            username: "testUser",
            password: "test",
            profile: {
                wallet: 100.0
            }
        });
    }
});
