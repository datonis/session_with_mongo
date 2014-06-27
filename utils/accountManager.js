'use strict';

var mongodb = require('mongodb');
var uuid = require('uuid');

module.exports.createAccount = function(name, id, passwd, fn) {
  var mongoClient = mongodb.MongoClient;

  mongoClient.connect('mongodb://localhost:27017/teatime', function(err, db) {
    var collection = db.collection('userauth');

    collection.find({userid: id}).toArray(function(err, results) {
      if (results.length === 0) {
        var uid = uuid.v1();
        collection.insert({_id: uid, name: name, userid: id, password: passwd, perm: []}, function(err, result) {
          fn(null);
        });
      }
      else {
        if (fn !== undefined) {
          fn ({msg: "User ID exists"});
        }
      }
      db.close();
    });
  }); 
};

module.exports.updateAccount = function(id, data, fn) {
  var mongoClient = mongodb.MongoClient;

  mongoClient.connect('mongodb://localhost:27017/teatime', function(err, db) {
    var collection = db.collection('userauth');

    collection.find({userid: id}).toArray(function(err, results) {
      if (results.length === 0) {
        fn({msg: "Not correct user ID"}, null);
      }
      else {
        for (var idx in data) {
          results[0][idx] = data[idx];
        }
        collection.update({userid: id}, results[0], function(err) {
          fn(null);
        });
      }
      db.close();
    });
  });
};

module.exports.deleteAccount = function(id, fn) {
  var mongoClient = mongodb.MongoClient;

  mongoClient.connect('mongodb://localhost:27017/teatime', function(err, db) {
    var collection = db.collection('userauth');

    collection.find({userid: id}).toArray(function(err, results) {
      if (results.length === 0) {
        fn({msg: "Not correct user ID"});
      }
      else {
        fn(null);
      }
      db.close();
    });
  });
};

module.exports.userAuthenticate = function(id, passwd, fn) {
  var mongoClient = mongodb.MongoClient;

  mongoClient.connect('mongodb://localhost:27017/teatime', function(err, db) {
    var collection = db.collection('userauth');

    collection.find({userid: id, password: passwd}).toArray(function(err, results) {
      if (results.length === 0) {
        fn({msg: "Wrong ID or password"}, null);
      }
      else {
        fn(null, results[0]);
      }
      db.close();
    });
  });
};

