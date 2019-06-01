//load all needed moduls
var bcrypt = require('bcrypt-nodejs');
var User = require('../models').User;
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    // local strategy
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ where: { username: username } })
                 .then(function (user) {
                     if (!user) {
                         return done(null, false, { message: 'Incorrect username.' });
                     }     
                     // if there is a user match
                    bcrypt.compare(password, user.password, function(err, isMatch) {
                        if(err) {
                            return done(err);
                        };
                        if(isMatch) {
                            return done(null, user);
                        } 
                        else {
                            return done(null, false, {message: "Wrong password"});
                        }
                    });
                 }).catch(err => done(err));
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findOne({ where: { id: id } }).then(user => {
            done(null, user);
        });
    });
}