var mongoose = require('mongoose');
var dbURI = 'mongodb://192.168.99.100/doyoumood';
//var dbURI = 'mongodb://localhost/doyoumood';

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

// For nodemon restarts
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// For app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});

// For app termination
process.on('SIGTERM', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});

require('./../models/user');
require('./../models/vote');
require('./../models/user');
require('./../models/report');