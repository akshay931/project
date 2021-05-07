var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage');
});
router.get('/search', function(req, res, next) {
  res.render('search');
});
router.get('/add', function(req, res) {
  res.render('add');
});
router.post('/add-post', function(req, res) {
  client.connect(function(err) {
    const db = client.db(dbName);
    assert.equal(null, err);
    db.collection("minutes").insertOne({title:req.body.title,date:req.body.date,description:req.body.text},function(err, result) {
      if (err) throw err;
      res.render('add');
    });
  });
});
router.get('/remove', function(req, res, next) {
  client.connect(function(err) {
    const db = client.db(dbName);
    assert.equal(null, err);
    db.collection("minutes").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.render('remove',{"minutes":result});      
    });
  });
});
router.get('/list', function(req, res, next) {
  client.connect(function(err) {
    const db = client.db(dbName);
    assert.equal(null, err);
    db.collection("minutes").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.render('list',{"minutes":result});
    });
  });
});

router.post('/search', function(req, res) {
  res.json({search : req.body.search});

});
router.post('/delete', function(req, res) {
  
  client.connect(function(err) {
    const db = client.db(dbName);
    assert.equal(null, err);
    console.log(req.body.delete);
    db.collection("minutes").deleteOne({_id:new mongodb.ObjectID(req.body.delete)},function(err, obj) {
      res.render('remove');
    });
  });
});

module.exports = router;
