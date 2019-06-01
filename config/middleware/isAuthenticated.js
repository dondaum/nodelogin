// This is middleware for restricting routes a user is not allowed to visit if not logged in
  module.exports = function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
      req.flash('error', 'You must log in or signup');
      res.redirect('/users/user/login');
    }
  }
  
  