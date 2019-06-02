const User = require('./models').User

//get some fake data for example
const faker = require('faker');
const email = faker.internet.email();
const password = faker.internet.password();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const username = faker.internet.userName();
const age = 23

const body = {
    email: email, 
    password: password, 
    lastName: lastName, 
    firstName: firstName,
    username: username,
    age: age
};

//create a user
//const newUser = await User.create(body);
// User.create(body).then( function(user) {
//    console.log('User is created', user )
// });

// update a user to be admin

User.findOne({where: {username: 'dondaum'}}).then( user => {
    user.update({isAdmin: true});
});


// destroy all users
// User.destroy({
//     where: {},
//     truncate: true
// });

//find the user
//let user = await User.findOne({where: {email}});


//console.log(user);

//destroy the user with the object, this will call DELETE where id = our_user_id automatically.
//await user.destroy();