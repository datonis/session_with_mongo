var path = require('path');
var express = require('express');
var session = require('express-session');
var consolidate = require('consolidate');
var mongodb = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var uuid = require('uuid');
var route = require('./config/route');

var app = express();
var port = 1025;

var sessionStore = new mongodb({
  host: 'localhost',
  port: 27017,
  db: 'user_authentication',
  collection: 'sessions',
  defaultExpirationTime: 6 * 1000
});

app.engine('html', consolidate['swig']);
app.set('views', path.normalize(__dirname + '/views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  name: 'SeptemCookie',
  secret: "Septem GO GO NIPPON!",
  genid: uuid.v1,
  store: sessionStore,
  cookie: {
    maxAge: 60 * 1000
  }
}));

app.use(function(req, res, next) {
  req.session.cookie.session_id = req.sessionID;
  console.log("\n---------------- [Split] ----------------");
  console.log("Request URL: %s, Session ID: %s", req.url, req.sessionID);
  next();
});

route(app);

console.log("Service starting on port %d", port);
app.listen(port);
