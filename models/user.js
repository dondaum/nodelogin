'use strict';
var bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email adress!'
        }
      }
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Please enter a valid age! E.g. 18 or 88!'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  
  User.beforeCreate(function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.prototype.sayHi = function() {
    return 'Hi from a custom user method of the user model';
  };

  User.prototype.checkAdmin = function(user) {
    return new Promise(function(resolve, reject) {
      User.findOne({where: {id: user.id} }).then( user => {
        if(user.isAdmin === true) {
          resolve(user.isAdmin);
        }
        else if (user.isAdmin != true){
          resolve(user.isAdmin);
        }
        else {
          reject(Error('Something went wrong'));
        }
      });
    });
  };



  return User;

};

