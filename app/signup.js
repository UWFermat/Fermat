module.exports = {

  // signup:
  // requires user to submit first_name, last_name, email, password, and password confirm
  register: function(req, res){

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;

    if (password === confirm_password){
      res.json({
        status: "success",
        name: first_name + " " + last_name,
        email: email
      });
    }
    else{
      res.status(400).send({
        status: "error",
        reason: "Passwords do not match!",
      });
    }
  },



};
