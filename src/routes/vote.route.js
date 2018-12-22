module.exports = function(app) {
  const vote = require('../controller/vote.js');
  const report = require('../controller/report.js');
  const main = require('../controller/main.js');
 
  app.get('/api/votes', vote.getVote);
  app.post('/api/votes/:mood', vote.postVote);

  app.post('/api/report/:begin/:end', report.getData);

  app.get('/', main.get);
};