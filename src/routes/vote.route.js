const express = require('express');
const app = express();
const voteRoutes = express.Router();

// Require Game model in our routes module
let Vote = require('../models/Vote');

// Defined store route
voteRoutes.route('/add').post(function (req, res) {
  let vote = new Vote(req.body);
   vote.save()
    .then(vote => {
    res.status(200).json({'game': 'CoGamein added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
voteRoutes.route('/').get(function (req, res) {
   Vote.find(function (err, votes){
    if(err){
      console.log(err);
    }
    else {
      res.json(votes);
    }
  });
});

module.exports = voteRoutes;