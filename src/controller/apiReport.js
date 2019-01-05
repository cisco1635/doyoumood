const fs = require('fs');

// get a report from begining date to end date
module.exports.getData = function (req, res) {
    var path = './src/data';
    var nbVote = 0;

    // get template to concatenate data
    var template = './src/data/00000001.data';
    var data = fs.readFileSync(template, 'utf8');
    var obj = JSON.parse(data);

    // go through all files
    var i = 1;
    var trend = obj.trend;
    fs.readdirSync(path).forEach(function (file) {
        var longpath = path + '/' + file;
        fs.statSync(longpath);
        // get name of file + compare with begin and end
        var name = file.substring(0, 8);

        if (name >= req.params.begin && name <= req.params.end) {
            // read file content
            var f = fs.readFileSync(longpath, 'utf8');
            var data = JSON.parse(f);
            // concatenate data
            obj.repart.overjoyed = obj.repart.overjoyed + data.overjoyed;
            obj.repart.happy = obj.repart.happy + data.happy;
            obj.repart.neutral = obj.repart.neutral + data.neutral;
            obj.repart.annoyed = obj.repart.annoyed + data.annoyed;
            obj.repart.angry = obj.repart.angry + data.angry;

            // Get trend
            var votes = data.overjoyed + data.happy + data.neutral + data.annoyed + data.angry;
            trend[name] = Math.round((data.overjoyed * 5 + data.happy * 4 + data.neutral * 3 + data.annoyed * 2 + data.angry) / votes);
            i = i + 1;
        }
    });

    obj.nbVote = obj.repart.overjoyed + obj.repart.happy + obj.repart.neutral + obj.repart.annoyed + obj.repart.angry;
    var mathMoyene = Math.round((obj.repart.overjoyed * 5 + obj.repart.happy * 4 + obj.repart.neutral * 3 + obj.repart.annoyed * 2 + obj.repart.angry) / obj.nbVote);
    var img = "overjoyed";
    if (mathMoyene<=1.5) {
        img="angry";
    }
    else if (mathMoyene>1.5 && mathMoyene<=2.5) {
        img="annoyed";
    }
    else if (mathMoyene>2.5 && mathMoyene<=3.5) {
        img="neutral";
    }
    else if (mathMoyene>3.5 && mathMoyene<=4.5) {
        img="happy";
    }
    obj.moyenne = img;

    res.status(200).json(obj);
}