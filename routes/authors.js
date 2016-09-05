var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var author=mongoose.model('User');

router.get('/api/authors', function(req, res, next) {

	User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
            	res.send(err)

            res.json(users);
        });

});

router.param('authorsList', function(req, res, next, authorsList) {
	  var query = User.find( { papersAuthored: { $exists: true, $ne: [] } } )

	  

	  query.exec(function (err, user){
	    if (err) { return next(err); }
	    if (!user) { return next(new Error('can\'t find user')); }

	    req.user = user;
	    return next();
	  });
	});

router.get('/api/authors/:authorsList', function(req, res) {
	res.json(req.user);
});