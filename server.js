// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./src/config/db');
require('./src/config/passport');


const app = express();
app.use(cors());

/**
 * Parsers for POST data
 */
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * Point static path to dist
 */
app.use(express.static(path.join(__dirname, 'dist/doyoumood')));


/**
 * routing
 */
const routes = require('./src/routes/vote.route.js');
routes(app);

/**
 * Authentification
 */
app.use(passport.initialize());

/**
 * Catch error 404
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Catch error 401
 */
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTPS server.
 */
const server = http.createServer(app);

server.listen(port, () => console.log(`Application running on localhost:${port}`));
