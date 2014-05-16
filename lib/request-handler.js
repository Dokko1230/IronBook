var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');

var Lift = require('../app/models/lift');
var User = require('../app/models/user');

var Promise = require('bluebird');
// var Links = require('../app/collections/links');
// var Users = require('../app/collections/users');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

/**
 * Find all lifts
 */
exports.fetchLifts = function(req, res) {
  var userId = req.session.user._id;
  Lift.find({ user: userId }, function(err, lifts) {
    if(err) return console.error(err);
    console.log('gettings lifts: ', lifts);
    res.send(200, lifts);
  });
};

exports.saveLift = function(req, res) {
  var params = req.body;

  var userId = req.session.user._id;
  var lift = new Lift({
    name: params.name,
    weight: params.weight,
    reps: params.reps,
    sets: params.sets,
    user: userId
  });

  lift.save(function() {
    res.redirect('/');
  });

};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({username: username}, function(err, users){
    if(err) console.log(err);
    if(users.length > 0){
      var user = users[0];
      user.comparePassword(password, function(match) {
        if(match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
};



exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({username: username}, function(err, users) {
    if (err) {
      console.log(err);
    } else if (users.length > 0) {
      console.log('Account exists already');
      res.redirect('/signup');
    } else {
      var user = new User({
        username: username,
        password: password
      });
      user.hashPassword()
      .then(function(hash) {
        this.password = hash;
        return new Promise(function(resolve, reject) {
          resolve();
        });
      })
      .then(function(){
        user.save(function() {
          console.log('User ', username, 'created');
          res.redirect('/login');
        });
      });
    }
  });

};

exports.navToLink = function(req, res) {

  Link.find({ code: req.params[0] }, function(err, links) {
    if(links.length > 0) {
      var link = links[0];
      link.visits++;
      link.save(function() {
        res.redirect(links[0].url);
      });
    } else {
      res.redirect('/');
    }
  });
};
