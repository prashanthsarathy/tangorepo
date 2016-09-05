var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var passport = require('passport');
var jwt=require('express-jwt');

var User=mongoose.model('User');

var auth=jwt({secret:'SECRET',userProperty:'payload'});

router.get('/home',function(req,res){
  res.sendfile('home');
});

router.post('/register',function(req,res,next){
	
	if(!req.body.username||!req.body.password){
		return res.status(400).json({userpass:'$req.body.username',message:'Please fill all the fields'});

	}
	var user=new User();
	user.username=req.body.username;
	user.password=req.body.password;
	user.setPassword(req.body.password);

	user.save(function(err){
		if(err){return next(err);}

		return res.json({token:user.generateJWT()})
	});

});


router.post('/login',function(req,res,next){
  if(!req.body.username||!req.body.password){
    return res.status(400).json({message:'Please fill all the fields'});

  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT(),uid:user._id});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);

});

router.get('/api/users', function(req, res, next) {

        // use mongoose to get all todos in the database
        User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all todos in JSON format
        });
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
