var mongoose = require('mongoose');
var User = mongoose.model('User');



module.exports.getAllUsers = function (req, res) {

    User.find({}, function(err, users) {
		res.send(users);  
	});
}