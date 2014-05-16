var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var routes = require('./routes');
var users = require('./routes/user');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(app.router);

// app.get('/', util.checkUser, handler.renderIndex);
app.get('/', handler.renderIndex);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.post('/lift', handler.saveLift);
app.get('/lifts', handler.fetchLifts);

module.exports = app;
