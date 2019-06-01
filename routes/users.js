var express = require('express');
var router = express.Router();
var User = require('../models').User;
const Sequelize = require('sequelize');
var passport   = require('passport');

/* GET users listing. */
router.get('/', checkAuthentication, function(req, res, next) {
  User.findAll({
    where: {
      id: req.user.id
    }}).then(users => {
    res.render('users/index', { 
      users: users,
      messages: req.flash('info') 
    });
  });
});

/* GET user new form. */
router.get('/new', function(req, res, next) {
  res.render('users/new', {
    messages: req.flash('warning')
  });
});

router.post('/create', function(req, res, next) {
  const user = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    age: req.body.age,
    password: req.body.password
  };

  User.create(user).then( function(user) {
    req.flash('info', 'User was successfully created!');
    res.redirect('/users');
  }).catch(Sequelize.ValidationError, function(err) {
  
    var errMessages = []
    Object.entries(err["errors"]).forEach(([key, value]) => {
       errMessages.push(value['message']);
    });
    req.flash('warning', err.errors);
    res.redirect('/users/new');
     
  });

});

/* GET a single user */
router.get('/:id', checkAuthentication, function(req, res, next) {
  User.findOne({ where: {id: req.user.id}}).then( function(user) {
    res.render('users/show', {
      user: user
    });
  }).catch( function(error) {
    console.log(err);
    res.redirect('/');
  });
});


router.delete('/:id', checkAuthentication , function(req, res, next) {
  User.destroy({
    where: { id: req.params.id }
  }).then( success => {
    console.log("user deleted with user id: " + success);
    req.flash('info', 'User was destroyed successfully!');
    res.redirect('/users');
  }).catch( err => {
    console.log(err);
  });
});


router.get('/user/login', function(req, res, next){
  
  res.render('users/login', {
    error_messages: req.flash('error'),
    success_messages: req.flash('success')
  });
});

router.post('/user/login', function(req, res, next){
  console.log(req.body);

  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/user/login',
    failureFlash: true
  })(req, res, next);
});


router.get('/user/logout', function(req,res,next) {
  req.logout();
  req.flash('success', 'You have logged out!');
  res.redirect('/users/user/login');
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
