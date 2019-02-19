const constants = require ('../models/const');
const fs = require('fs');
const path = require('path');
const Vote = require ('../models/vote');

/**
 * post a vote
 */
module.exports.postVoteOld = function (req, res) {

    
    var obj;

    var d = new Date();
    var todayFormat = [d.getFullYear(), getMonth(d), getDay(d)].join('');
    var todayfile = './../data/' + todayFormat + '.data';
    var template = './../data/00000000.data';
    var mood = req.params.mood;

    // use template for the day if not exists
    var data;

    if (!fs.existsSync(path.join(__dirname, todayfile))) {
        data = fs.readFileSync(path.join(__dirname, template), 'utf8');
    } else {
        data = fs.readFileSync(path.join(__dirname, todayfile), 'utf8');
    }

    obj = JSON.parse(data);
    switch (mood) {
        case "5":
            obj.overjoyed = obj.overjoyed + 1;
            break;
        case "4":
            obj.happy = obj.happy + 1;
            break;
        case "3":
            obj.neutral = obj.neutral + 1;
            break;
        case "2":
            obj.annoyed = obj.annoyed + 1;
            break;
        case "1":
            obj.angry = obj.angry + 1;
            break;
        default:
            break;
    }

    fs.writeFileSync(path.join(__dirname, todayfile), JSON.stringify(obj), 'utf8', function (err) {
        if (err) {
            console.log(err);
            res.status(500).json(obj);
        }
    });
    res.status(200).json(obj);
}

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
    // Set current date
    req.body.date = Date.now();
    // Update mood from id to string
    req.body.mood = constants.MOOD[req.body.mood];

    // Create object in database
    Vote.create(req.body, function (err, post) {
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