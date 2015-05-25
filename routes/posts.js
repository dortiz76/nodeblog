var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
//var db = require('monk')('localhost.nodeblog');
var db = require('monk')('mongodb://dortiz76:d04171976@ds031942.mongolab.com:31942/nodeblog');
router.get('/add', function(req, res, next){
	var categories = db.get('categories');

	categories.find({},{}, function(err, categories){
		res.render('addpost',{
			"title": "Add Post",
			"categories": categories
		});
	});
});
router.post('/add', function (req, res, next){
//get form values 
var title 		= req.body.title;
var category 	= req.body.category;
var body 		= req.body.body;
var aurthor 	= req.body.author;
var date 		= Date();

if(req.files.mainimage){

    var mainImageOrignalName 	= req.files.mainimage.originalname
    var mainImageName 			= req.files.mainimage.name;
    var mainImageMime			= req.files.mainimage.mimetype;
    var mainImagePath			= req.files.mainimage.path;
    var mainImageExt  			= req.files.mainimage.extension;
    var mainImageSize 			= req.files.mainimage.size;

} else {

 var mainImageName = 'noimage.png';

}
//form valiation
req.checkBody('tite', 'Title field is required').notEmpty();
req.checkBody('body', 'Body field is required');


//check errors
var errors = req.validationerrors();
if(errors){
	res.render('addpost', {
		"errors": errors,
		"title": title,
		"body": body
	});
}else{
	var posts = db.get('posts');
	//submit to db
	post.insert({
		"title": title,
		"body": body,
		"category": category,
		"date": date,
		"author": author,
		"mainimage": mainimage

	   }, function(err, post){
	   	if(err) {
	   		res.send('There was an issue subnitting the post');
	   	}else{
	   		req.flash('success','Post Submitted');
	   		res.location('/');
	   		res.redirect('/');
	   	}

	   });
	}

});


module.exports = router;