'usr strict';

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

  app.route('/authenticate').post(function(req, res) {
    console.log(req.body);
    res.send("Hi, Septem");
  });
};
