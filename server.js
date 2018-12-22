// Get dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');


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
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Create HTTPS server.
 */
const server = http.createServer(app);

server.listen(port, () => console.log(`Application running on localhost:${port}`));
