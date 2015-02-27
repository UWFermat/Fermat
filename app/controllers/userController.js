var user = require('../models/userModel.js');

module.exports = {

  signup: function(req, res){

    var firstName, lastName, email, password;
    firstName = req.body.first_name;
    lastName = req.body.last_name;
    email = req.body.email;
    password = req.body.password;

    user.signup(firstName, lastName, email, password, res);
    // res.send(user.responseJson);

  },

  login: function(req, res){
    var email, password;
    email = req.body.email;
    password = req.body.password;

    user.login(email, password, res);
  
  }
};
