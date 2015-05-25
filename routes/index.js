var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
//var db = require('monk')('localhost.nodeblog');
var db = require('monk')('mongodb://dortiz76:d04171976@ds031942.mongolab.com:31942/nodeblog');
//Homepage Blog post
router.get('/', function(req, res, next) {
 var db = req.db;
 var posts = db.get('posts');
 posts.find({}, {},function(err, posts){
res.render('index', {
	"posts": posts
});
 });
});

module.exports = router;
