var User = require('../models/userModel.js');
var bCrypt = require('bcrypt-nodejs');

// helpers
function createHash(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password){
  return bCrypt.compareSync(password, user.password);
}


module.exports = {

  signup: function(req, res){

    var firstName, lastName, email, password;
    firstName = req.body.first_name;
    lastName = req.body.last_name;
    email = req.body.email;
    password = req.body.password;

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

  login: function(req, res){
    var email, password;
    email = req.body.email;
    password = req.body.password;

    User.findOne({email: email}, function(err, user){
      if (err){
        console.log("Error: " + err);
      }
      if (!user){
        res.send({status: "error", message: "User does not exist"}, 401);
      }
      if (user){
        if (isValidPassword(user, password)){
          res.send({status: "success", message: "Login successful"}, 200);
        }
        else{
          res.send({status: "error", message: "Bad password"}, 401);
        }
      }
    });
  
  }
};
