const User = require('../models/user');

module.exports.profile = async function (req, res) {
 
  return res.render('user_profile',{
    title: 'User Profile',
    user: req.user,
  })
};


//render the sign up page
module.exports.signUp = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect("/users/profile");
  }
  return res.render('user_sign_up', {
    title:'Codeial | sign Up'
  })
}

//render the sign in page
module.exports.singIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect("/users/profile");
  }
  return res.render('user_sign_in',{
    title:'Codeial | sign In  '
  })
}

//get the sign up data
module.exports.create=function(req,res){
  if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
  }
  User.findOne({email:req.body.email},function(err,user){
    if(err){
      console.log("Error in finding user in signing up");
      return;
    }
    if(!user){
      User.create(req.body,function(err,user){
        if(err){
          console.log("Error in creating user while signing up");
          return;
        }
        return res.redirect('/users/sign-in');
      })
    }
    else{
      return res.redirect('back');  
    }
  });

}

//Sign in and create a session for user
module.exports.createSession=function(req,res){
  return res.redirect('/');
}


// module.exports.destroySession = function(req,res){
//   req.logout();
//   return res.redirect('/');
// }
module.exports.destroySession = function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log('Error logging out:', err);
    }
    return res.redirect('/');
  });
};
