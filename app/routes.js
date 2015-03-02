// var signup = require('./passport/signup.js');
var prefix = "/api/v1/";
var userController = require('./controllers/userController');

module.exports = function(app){

  // app.all('/oauth/token', app.oauth.grant());

  // app.get('/', app.oauth.authorise(), function(req, res){
  //   res.send({area: 'secret'});
  // });

  // app.use(app.oauth.errorHandler());

  app.post(prefix + "signup", function(req, res){
    console.log(req.session);
    userController.signup(req, res);
  });

  app.post(prefix + "login", function(req, res){
    console.log(req.session);
    userController.login(req, res);
  });

  app.get(prefix + "hello", function(req, res){
    var name = req.query.name;
    console.log(req.session);
    var response = {hello: name};

    res.send(response);
  });


};
