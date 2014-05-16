var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

usersSchema.method('comparePassword', function(attemptedPassword, callback){
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
  });
});

usersSchema.method('hashPassword', function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this);
});

var User = mongoose.model('User', usersSchema);

module.exports = User;
