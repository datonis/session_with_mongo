var express = require('express');
var session = require('express-session');
var mongodb = require('connect-mongo')(session);

var app = express();
var port = 1025;

var sessionStore = new mongodb({
  db: 'user_authtication',
  collection: 'sessions',
  host: 'localhost',
  port: 27017
});

app.use(session({
  secret: "Hi, Septem",
  store: sessionStore,
  cookie: {
    maxAge: 60 * 1000
  }
}));

app.use(function(req, res, next) {
  console.log("Request URL: %s", req.url);
  next();
});

app.get('/', function(req, res) {
  res.send("Hi, Septem");
});

console.log("Service starting on port %d", port);
app.listen(port);
