const constants = require ('../models/const');
const mongoose = require('mongoose');
const Vote = mongoose.model('Vote');

/*
 * Get a vote by id
 */
module.exports.getVote = function (req, res) {
    Vote.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.status(200).json(post);
    });
}

/*
 * Post a single new vote
 */
module.exports.postVote = function(req, res, next) {
	var vote = new Vote();
    vote.mood = req.body.nb;
    vote.comment = req.body.comment;
	  vote.date = Date.now();
	
    // Create object in database
    vote.save(function (err, post) {
      if (err) return next(err);
      res.status(200).json(post);
    });
}

function getMonth(date) {
    var month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  }  

  function getDay(date) {
    var day = date.getDate();
    return day < 10 ? '0' + day : '' + day;
  }  