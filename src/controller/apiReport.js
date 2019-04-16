const constants = require ('../models/const');
const mongoose = require('mongoose');
const Vote = mongoose.model('Vote');
// const Report = require ('../models/report');
var trend;

// get a report from begining date to end date
module.exports.getData = function (req, res) {
    console.log("Entering getDate Function 'api report'");
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

    // DONE
    obj.nbVote = obj.repart.overjoyed + obj.repart.happy + 
    obj.repart.neutral + obj.repart.annoyed + obj.repart.angry;
    
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

module.exports.getReportBetweenDate = function (req, res) {

    console.log("Entering getReportBetweenDate Function 'api report'");

    var report = {};

    var unformatedDateBegin = req.params.begin;
    var unformatedDateBeginYear = unformatedDateBegin.substring(0,4);
    var unformatedDateBeginMonth = unformatedDateBegin.substring(4,6);
    var unformatedDateBeginDay = unformatedDateBegin.substring(6,8);

    var unformatedDateEnd = req.params.end;
    var unformatedDateEndYear = unformatedDateEnd.substring(0,4);
    var unformatedDateEndMonth = unformatedDateEnd.substring(4,6);
    var unformatedDateEndDay = unformatedDateEnd.substring(6,8);
    console.log("Day: " + unformatedDateEndDay);

    var dateBegin = new Date(unformatedDateBeginYear,unformatedDateBeginMonth-1,unformatedDateBeginDay,1);
    var dateEnd = new Date(unformatedDateEndYear,unformatedDateEndMonth-1,unformatedDateEndDay,new Date().getHours());
 
    Vote.find({"date" : {"$gte": new Date(dateBegin), "$lte": new Date(dateEnd)}}, function (err, result) {
        if(!err){
            // Total votes
            report.nbVote = result.length;

            console.log(result);

            // Filter vote by 'mood'
            report.repart = {};
            report.repart.overjoyed= result.filter(vote => vote.mood === 'overjoyed').length;
            report.repart.happy= result.filter(vote => vote.mood === 'happy').length;
            report.repart.neutral= result.filter(vote => vote.mood === 'neutral').length;
            report.repart.annoyed= result.filter(vote => vote.mood === 'annoyed').length;
            report.repart.angry= result.filter(vote => vote.mood === 'angry').length;
            console.log("ResultRepart");
            console.log(report.repart);

            // Calculate trend
            report.trend = calculTrendByDay(dateBegin, dateEnd, result);
            console.log("ResultTrend");
            console.log(report.trend);
            // Calculate moyenne for these dates
            report.moyenne = Math.round(
                    report.repart.overjoyed * 5
                +   report.repart.happy * 4
                +   report.repart.neutral * 3
                +   report.repart.annoyed * 2
                +   report.repart.angry) / report.nbVote;

            // Affect img regarding moyenne
            report.imgmoyenne= "overjoyed";

            if (report.moyenne<=1.5) {
                report.imgmoyenne= "angry";
            }
            else if (report.moyenne>1.5 && report.moyenne<=2.5) {
                report.imgmoyenne= "annoyed";
            }
            else if (report.moyenne>2.5 && report.moyenne<=3.5) {
                report.imgmoyenne= "neutral";
            }
            else if (report.moyenne>3.5 && report.moyenne<=4.5) {
                report.imgmoyenne= "happy";
            }

            // push comment of each vote
            if( result.comment !== null || result.comment.length >= 1 ) {
                report.comments.push(result.comment);
            }
            
            res.status(200).json(report);
        }
        else{
            console.log("Error while requesting moongo");
            res.status(500);
        }
    });
}

function calculTrendByDay(dateBegin, dateEnd, listOfVotes){
    
    trend = {};
    for (d = dateBegin; d < dateEnd; d.setDate(d.getDate() + 1)) {
        d.setHours(0,0,0);
        voteByDay= listOfVotes.filter(vote => vote.date.getDate() == d.getDate());
        console.log("Date " + d);
        console.log(voteByDay);
        if(voteByDay.length > 0){
            trend[d]= voteByDay.filter(vote => vote.mood === "overjoyed").length * 5 
                +   voteByDay.filter(vote => vote.mood === "happy").length * 4 
                +   voteByDay.filter(vote => vote.mood === "neutral").length * 3 
                +   voteByDay.filter(vote => vote.mood === "annoyed").length * 2
                +   voteByDay.filter(vote => vote.mood === "angry").length;
            console.log(trend[d]);
            trend[d] = Math.round(trend[d] / voteByDay.length);
        }
        else{
            trend[d] = 0;
        }
    }

    // console.log("Trend:");
    // console.log(trend);
    return trend;
}
