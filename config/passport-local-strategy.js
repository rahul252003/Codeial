const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> passport");
          return done(err);
        }
        if (!user || user.password != password) {
          // console.log("Invalid Username/Password");
          return done(null, false, { message: "Invalid Username/Password" });
        }
        // console.log("User Authenticated");
        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport");
      return done();
    }
    return done(err, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the useer is signed in 
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in 
    return res.redirect('/users/sign-in')
};
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie
        res.locals.user = req.user;
    }
    next();
}
//console.log(passport)
module.exports = passport; 


