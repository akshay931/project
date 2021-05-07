var express = require('express');
var router = express.Router();


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
  res.render('add');
});
router.get('/remove', function(req, res, next) {
  client.connect(function(err) {
    const db = client.db(dbName);
    assert.equal(null, err);
    db.collection("minutes").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.render('add-remove',{"minutes":result});      
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


router.post('/delete', function(req, res) {
  
  client.connect(function(err) {
    const db = client.db("project");
    assert.equal(null, err);
    db.collection("minutes").deleteOne({"_id":req.body.id},function(err, obj) {
      res.render('add-remove');
    });
  });
});

module.exports = router;
