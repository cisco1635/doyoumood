const path = require('path');

// Catch all routes and return the index file
module.exports.get = function (req, res) {
    res.sendFile(path.join(__dirname, '/../../dist/doyoumood/index.html'));
}