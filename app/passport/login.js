var passport = require('passport');

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done){
    User.findOne({'username' : username}, function(err, user){
      if (err){
        return done(err);
      }
      if (!user){
        console.log('User not found with username ' + username);
        return done(null, false, req.flash('message', 'User not found'));
      }
      if (!isValidPassword(user, password)){
        console.log('Invalid password');
        return done(null, false, req.flash('message', 'Invalid password'));
      }
      return done(null, user);
    });
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done){
    findOrCreateUser = function(){
      User.findOne({'username':username}, function(err, user){
        if (err){
          console.log("Error in signup: " + err);
          return done(err);
        }
        if (user){
          console.log("User already exists");
          return done(null, false, req.flash('message', "User already exists"));
        }
        else{
          
        }
      });
    };
  }
));
