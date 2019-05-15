var express = require('express');
var router = express.Router();
var User = require('../models').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll().then(users => {
    res.render('users/index', { users: users });
  });
});

/* GET user new form. */
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

module.exports = router;
