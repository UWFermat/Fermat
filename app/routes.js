// var signup = require('./passport/signup.js');
var prefix = "/api/v1/";
var userController = require('./controllers/userController');

module.exports = function(app){

  app.post(prefix + "signup", function(req, res){
    userController.signup(req, res);
  });

  app.post(prefix + "login", function(req, res){
    userController.login(req, res);
  });

  app.get(prefix + "hello/:name", function(req, res){
    var name = req.body.name;
    var response = {hello: name};

    res.send(response);
  });


};
