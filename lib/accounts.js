Meteor.methods({
  addUser: function(arguments){
    check(arguments, {
      email: String,
      password: String
    });

    var userId = Accounts.createUser({
      email: arguments.email,
      password: arguments.password,
      profile: {}
    });

    Accounts.sendVerificationEmail(userId);
  }
});
