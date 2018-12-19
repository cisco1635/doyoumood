const fs = require('fs');

/**
 * post a vote
 */
module.exports.postVote = function (req, res) {
    var obj;
    var d = new Date();
    var todayFormat =  [d.getFullYear(),d.getMonth()+1,d.getDate()].join('');
    var path = './data/' + todayFormat + '.data';
    var template = './data/00000000.data';
    var mood = req.params.mood;

    // use template for the day if not exists
    var data;
    if (!fs.existsSync(path)) {
        data = fs.readFileSync(template,'utf8');
    }
    else {
        data = fs.readFileSync(path,'utf8');
    }

    obj = JSON.parse(data);
    switch(mood) {
        case "overjoyed":
            obj.overjoyed = obj.overjoyed+1;
            break;
        case "happy":
            obj.happy = obj.happy+1;
            break;
        case "neutral":
            obj.neutral = obj.neutral+1;
            break;
        case "annoyed":
            obj.annoyed = obj.annoyed+1;
            break;
        case "angry":
            obj.angry = obj.angry+1;
            break;
        default:
            break;
        }
    
    fs.writeFileSync(path, JSON.stringify(obj), 'utf8', function(err) {
        if (err) {
            console.log(err);
            res.status(500).json(obj);
        }
    });

    res.status(200).json(obj);
} 

module.exports.getVote = function (req, res) {
	res.status(200).json({"id":1});
}


