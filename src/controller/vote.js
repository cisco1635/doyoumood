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
module.exports.postData = function (req, res) {
    var obj;
    var today = Date.now();
    var todayFormat =  [d.getFullYear(),pad(d.getMonth()+1),pad(d.getDate())].join('');
    var path = '../data/' + todayFormat + '.data';
	fs.readFile(path, 'utf8', function (err, data) {
        obj = JSON.parse(data);
        switch(expression) {
            case "overjoyed":
              obj.data.overjoyed = obj.data.overjoyed+1;
              break;
            case "happy":
              obj.data.happy = obj.data.happy+1;
              break;
            case "neutral":
              obj.data.neutral = obj.data.neutral+1;
              break;
            case "annoyed":
              obj.data.annoyed = obj.data.annoyed+1;
              break;
            case "angry":
              obj.data.angry = obj.data.angry+1;
              break;
            default:
              break;
          }
    });
    
    fs.writeFile(path, obj, function(err) {
        if (err) {
            console.log(err);
        }
    });

    res.status(200).json(obj);
} 

module.exports.getVote = function (req, res) {
	res.status(200).json({"id":1});
}
