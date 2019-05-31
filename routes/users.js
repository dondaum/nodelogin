var express = require('express');
var router = express.Router();
var User = require('../models').User;
const Sequelize = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll().then(users => {
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
router.get('/:id', function(req, res, next) {
  User.findOne({ where: {id: req.params.id}}).then( function(user) {
    res.render('users/show', {
      user: user
    });
  }).catch( function(error) {
    console.log(err);
    res.redirect('/');
  });
});


router.delete('/:id' , function(req, res, next) {
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

module.exports = router;
