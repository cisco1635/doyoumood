module.exports = function(app) {
  const vote = require('../controller/apiVote.js');
  const report = require('../controller/apiReport.js');
  const main = require('../controller/main.js');
 
  app.get('/api/votes', vote.getVote);
  app.post('/api/votes/:mood', vote.postVote);

  app.post('/api/report/:begin/:end', report.getData);

  app.get('/', main.get);
};