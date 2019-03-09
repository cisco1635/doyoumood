var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = function(app) {
  const vote = require('../controller/apiVote.js');
  const report = require('../controller/apiReport.js');
  const auth = require('../controller/apiProfile.js');
  const main = require('../controller/main.js');
 
  app.get('/api/votes', vote.getVote);
  app.post('/api/votes/:mood', vote.postVote);

  app.get('/api/report/:begin/:end', report.getData);
  
  app.post('/api/register',auth.register);
  app.post('/api/login', auth.login);

  app.get('/', main.get);
};