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
    },
    'buyOrSell': function(amount, positive) {
        var total = Meteor.user()
            .wallet;
        if (positive) {
            //that means the user sold
            total += amount;


        } else {
            total -= amount;
        }
        Meteor.users.update(Meteor.user()
            ._id, {
                $set: {
                    wallet: total
                }
            });

        return total;
    }
});
