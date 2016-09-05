var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var reviewer=mongoose.model('User');

router.get('/api/reviewers', function(req, res, next) {

	User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
            	res.send(err)

            res.json(users);
        });

});

router.param('reviewersList', function(req, res, next, reviewersList) {
	  var query = User.findbyId(id)
	  

	  query.exec(function (err, user){
	    if (err) { return next(err); }
	    if (!user) { return next(new Error('can\'t find user')); }

	    req.user = user;
	    return next();
	  });
	});

router.get('/api/reviewers/:reviewersList', function(req, res) {
	res.json(req.user);
});

