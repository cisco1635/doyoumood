var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');


// get a report from begining date to end date
module.exports.register = function(req, res) {
	
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	
	user.setPassword(req.body.password);
	
	
	user.save(function(err) {
		
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"token" : token
		});
		
	});
};

module.exports.login = function(req, res) {

	passport.authenticate('local', function(err, user, info){

		var token;

		// If Passport throws/catches an error
		if (err) {
		  res.status(404).json(err);
		  return;
		}

		// If a user is found
		if(user){
		  token = user.generateJwt();
		  res.status(200);
		  res.json({
			"token" : token
		  });
		  
		} else {
			// If user is not found
			res.status(401).json(info);
		}
	})(req, res);

};

module.exports.profile = function(req, res) {
	
	if (!req.payload._id) {
		res.status(401).json({
			"message" : "UnauthorizedError: private profile"
		});
	} else {
		User.findById(req.payload._id)
			.exec(function(err, user) {
				res.status(200).json(user);
			});
	}
  
};