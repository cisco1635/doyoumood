module.exports = function(app) {
  const voteController = require('../controller/apiVote.js');
  const reportController = require('../controller/apiReport.js');
  const report = require('../controller/apiReport.js');
  const main = require('../controller/main.js');
  const Vote = require('../models/vote.js');

  /*
  * ABOUT VOTE API ROUTING
  */
  // Get vote by id
  app.get('/api/votes/:id', voteController.getVote);

  // Post a new vote
  app.post('/api/votes/:mood', voteController.postVote);

  /*
  * ABOUT REPORT API ROUTING
  */ 
  // Get report between two dates
  app.get('/api/report/:begin/:end', reportController.getReportBetweenDate);


   /*
  * ABOUT HTML
  */ 
  // Rend Angular application
  app.get('/', main.get);
};