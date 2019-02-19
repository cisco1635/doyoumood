module.exports = function(app) {
  const voteController = require('../controller/apiVote.js');
  const report = require('../controller/apiReport.js');
  const main = require('../controller/main.js');
  const Vote = require('../models/vote.js');
  
 
  // Get vote by id
  app.get('/api/votes/:id', voteController.getVote);

  // Post a new vote
  app.post('/api/votes/:mood', voteController.postVote);
};