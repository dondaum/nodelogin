var express = require('express');
var router = express.Router();
var auth = require('../config/middleware/isAuthenticated');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/secret', checkAuthentication, function(req, res, next) {
  res.render('secret', { title: 'Secret' });
});


// access control 
function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
    req.flash('error', 'You must log in or signup');
    res.redirect('/users/user/login');
  }
}

module.exports = router;
