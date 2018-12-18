const fs = require('fs');

/**
 * get all data from the file
 */
module.exports.postData = function (req, res) {
    var obj;
    var today = Date.now();
    var todayFormat =  [d.getFullYear(),pad(d.getMonth()+1),pad(d.getDate())].join('');
    var path = '../data/' + todayFormat + '.data';
	fs.readFile(path, 'utf8', function (err, data) {
        obj = JSON.parse(data);
        
		res.status(200).json(obj);
	});
} 
