var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = function(app) {
  const voteController = require('../controller/apiVote.js');
  const reportController = require('../controller/apiReport.js');
  const authController = require('../controller/apiProfile.js');
  const userController = require('../controller/apiUser.js');
  const main = require('../controller/main.js');

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
  * ABOUT AUTHENTIFICATION API ROUTING
  */ 
  // Register to the application  
  app.post('/api/register',authController.register);
  
  // Login to the application
  app.post('/api/login', authController.login);


    /*
  * ABOUT USERS API ROUTING
  */ 
  
  // Login to the application
  app.get('/api/users', userController.getAllUsers);
  
  
  /*
  * ABOUT HTML
  */ 
  // Rend Angular application
  app.get('/', main.get);
};