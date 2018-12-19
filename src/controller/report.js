const fs = require('fs');

// get a report from begining date to end date
module.exports.getData = function (req, res) {
    var path = './data';
    var nbVote = 0;

    // get template to concatenate data
    var template = './data/00000001.data';
    var data = fs.readFileSync(template,'utf8');
    console.log("1: "+data);
    var obj = JSON.parse(data);

    // go through all files
    fs.readdirSync(path).forEach(function(file) {
        var longpath = path+'/'+file;
        fs.statSync(longpath);
        // get name of file + compare with begin and end
        var name = file.substring(0,8);
        if (name >= req.params.begin && name <= req.params.end) {
            // read file content
            var f = fs.readFileSync(longpath,'utf8');
            var data = JSON.parse(f);
            // concatenate data
            obj.repart.overjoyed = obj.repart.overjoyed + data.overjoyed;
            obj.repart.happy = obj.repart.happy + data.happy;
            obj.repart.neutral = obj.repart.neutral + data.neutral;
            obj.repart.annoyed = obj.repart.annoyed + data.annoyed;
            obj.repart.angry = obj.repart.angry + data.angry;
        }
    });

    obj.nbVote = obj.repart.overjoyed+obj.repart.happy+obj.repart.neutral+obj.repart.annoyed+obj.repart.angry;
    obj.moyenne = Math.round((obj.repart.overjoyed*5+obj.repart.happy*4+obj.repart.neutral*3+obj.repart.annoyed*2+obj.repart.angry)/obj.nbVote);

    res.status(200).json(obj);
}