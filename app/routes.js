var signup = require('./signup.js');
var prefix = "/api/v1/";

module.exports = function(app){
  //
  app.post(prefix + "signup/register", function(req, res){
    signup.register(req, res);
  });

  
};
