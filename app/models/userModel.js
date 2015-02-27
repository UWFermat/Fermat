var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');
var async = require('async');

var User = mongoose.model('User',{
  first_name: String,
  last_name: String,
  email: String,
  password: String,
});

module.exports = {

  signup: function(firstName, lastName, email, password, res){

    User.findOne({email: email}, function(err, user){
      if (err){
        res.send({status: "error", message: "Error in signup: " + err});
        // return responseJson;
      }
      if (user){
        res.send({status: "error", message: "User already exists"});
      }
      else{
        var newUser = new User();
        newUser.first_name = firstName;
        newUser.last_name = lastName;
        newUser.email = email;
        newUser.password = createHash(password);

        newUser.save(function(err){
          if (err){
            console.log("Error saving user: " + err);
            res.send({status: "error", message: "Error saving user: " + err});
          }
          else{
            console.log("User registration successful!");
            res.send({status: "success", message: "User registration successful!"});

          }
        });
      }
    });
  },

  login: function(email, password, res){
  
    User.findOne({email: email}, function(err, user){
      if (err){
        console.log("Error: " + err);
      }
      if (!user){
        res.send({status: "error", message: "User does not exist"});
      }
      if (user){
        if (isValidPassword(user, password)){
          res.send({status: "success", message: "Login successful"});
        }
        else{
          res.send({status: "error", message: "Bad password"});
        }
      }
    });

  }
};

// helpers
function createHash(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password){
  return bCrypt.compareSync(password, user.password);
}
