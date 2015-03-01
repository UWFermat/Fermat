var mongoose = require('mongoose');

var async = require('async');

var User = mongoose.model('User',{
  first_name: String,
  last_name: String,
  email: String,
  password: String,
});

module.exports = User;


