'usr strict';
var accountMgr = require('../utils/accountManager');

module.exports = function(app) {
  app.route('/').get(function(req, res) {
    res.send("Hi, Septem (Root)");
  });

  app.route('/GOGONIPPON').get(function(req, res) {
    res.send("Hi, Septem (GO GO NIPPON!!!)");
  });

  app.route('/login').get(function(req, res) {
    res.render('login', function(err, html) {
      res.send(html);
    });
  });

  app.route('/logout').get(function(req, res) {
    /* TODO: Clear login sessions */
    res.redirect('/');
  });

  app.route('/authenticate').post(function(req, res) {
    console.log(req.body);
    accountMgr.userAuthenticate(req.body.username, req.body.password, function(err, data) {
      
    });
/*
    if () {    
      res.render('logout', function(err, html) {
        res.send(html);
      });
    }
    else {
    }
*/
  });
};
