var express = require('express');
var session = require('express-session');
var mongodb = require('connect-mongo')(session);
var uuid = require('uuid');

var app = express();
var port = 1025;

var sessionStore = new mongodb({
  host: 'localhost',
  port: 27017,
  db: 'user_authentication',
  collection: 'sessions',
  defaultExpirationTime: 6 * 1000
});

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
  console.log("\n---------------- [Split] ----------------");
  console.log("Request URL: %s, Session ID: %s", req.url, req.sessionID);
  next();
});

app.get('/', function(req, res) {
  res.send("Hi, Septem");
});

console.log("Service starting on port %d", port);
app.listen(port);
