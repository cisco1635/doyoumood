const fs = require('fs');
const utf8 = require('utf8');

/**
 * post a vote
 */
module.exports.postVote = function (req, res) {
    var obj;
    var d = new Date();
    var todayFormat =  [d.getFullYear(),d.getMonth()+1,d.getDate()].join('');
    var path = './data/' + todayFormat + '.data';
    var template = './data/template.data';
    var mood = req.params.mood;

    // delete file
    if (fs.existsSync(path)) {
        //fs.unlinkSync(path);
    }
    // use template for the day if not exists
    var data;
    if (!fs.existsSync(path)) {
        data = fs.readFileSync(template,'utf8');
    }
    else {
        data = fs.readFileSync(path,'utf8');
    }

    console.log("Parse file : " + data);
    obj = JSON.parse(data);
    console.log("before total:"+obj);
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
            console.log("before:"+obj.annoyed);
            obj.annoyed = obj.annoyed+1;
            console.log("after:"+obj.annoyed);
            break;
        case "angry":
            obj.angry = obj.angry+1;
            break;
        default:
            break;
        }
    
    console.log("after total:"+obj);
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
