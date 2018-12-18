// Get dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const routes = require('./routes/vote.route.js');

const app = express();

/**
 * Parsers for POST data
 */
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Point static path to dist
 */
app.use(express.static(path.join(__dirname, 'dist')));

// Add headers
app.use(function (req, res, next) {


	    // Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		
	    // Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);


	// Pass to next layer of middleware
    next();
});


/**
 * routing
 */
routes(app);

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
