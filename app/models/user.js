var usersSchema = require('../config').usersSchema;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var User = mongoose.model('User', usersSchema);

module.exports = User;
