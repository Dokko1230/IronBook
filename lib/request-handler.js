/**
 * UTILITY
 */
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var _ = require('underscore');
var Promise = require('bluebird');

/**
 * DB
 */
var db = require('../app/config');
var Lift = require('../app/models/lift');
var User = require('../app/models/user');
// var Day = require('../app/models/day');

var getTodayInString = require('./utility').getTodayInString;

exports.renderIndex = function(req, res) {
  res.render('index', { name: 'index' });
};

exports.signupUserForm = function(req, res) {
  res.render('signup', { name: 'signup' });
};

exports.loginUserForm = function(req, res) {
  res.render('login', { name: 'login' });
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

/**
 * Find all lifts that the user haven't done for that day
 * Find today
 *   then find all lifts for that day (doneLifts)
 *   then find all lifts (lifts)
 *     then find all lifts that aren't in doneLifts 
 */
exports.fetchLifts = function(req, res) {
  var userId = req.session.user._id;

  var today = new Date();
  today.setHours(0,0,0,0);

  Lift.find({ 
    user: userId, 
    'completed.date': { $nin : [ getTodayInString() ] },
    todo: false
  }, function(err, lifts) {
    if(err) return console.error(err);
    console.log('gettings lifts: ', lifts);
    res.send(200, lifts);
  });

};

exports.fetchStats = function(req, res) {
  var userId = req.session.user._id;

  var today = new Date();
  today.setHours(0,0,0,0);

  Lift.find({ 
    user: userId
  }, function(err, lifts) {
    if(err) return console.error(err);
    console.log('fetching stats: ', lifts);
    res.send(200, lifts);
  });

};


exports.saveLift = function(req, res) {
  var params = req.body;
  console.log('lift: ', params);

  var userId = req.session.user._id;
  var lift = new Lift({
    name: params.name,
    currentWeight: params.weight,
    currentReps: params.reps,
    currentSets: params.sets,
    user: userId
  });

  lift.save(function() {
    res.redirect('/');
  });

};

exports.updateDay = function(req, res) {
  var params = req.body;
  var userId = req.session.user._id;
  var liftId = params._id;
  var today = new Date();
  today.setHours(0,0,0,0);

  var query = Lift.find({ user: userId, _id: liftId });
  var promise = query.findOne().exec();
  promise.then(function(lift) {
    var completed = lift.completed;
    var todaysStats = {
      date: getTodayInString(),
      weight: lift.currentWeight,
      reps: lift.currentReps,
      sets: lift.currentSets
    };
    completed.push(todaysStats);
    lift.save(function() {
      // Send success
    });
  });
};

exports.saveForLater = function(req, res) {
  var params = req.body;
  var userId = req.session.user._id;
  var liftId = params._id;

  var query = Lift.find({ user: userId, _id: liftId });
  var promise = query.findOne().exec();
  promise.then(function(lift) {
    lift.todo = true;
    lift.save();
  });
};

exports.updateLift = function(req, res) {
  var params = req.body;
  var userId = req.session.user._id;
  var query = Lift.where({ user: userId, name: params.name });
  var promise = query.findOne().exec();
  promise.then(function(lift) {
    // lift.weight += 5;
    lift.currentWeight = params.currentWeight;
    lift.currentReps = params.currentReps;
    lift.currentSets = params.currentSets;
    lift.save(function() {
      console.log('saved');
    });
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

// Add save it for later functionality



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
