const constants = require ('../models/const');
const mongoose = require('mongoose');
const Vote = mongoose.model('Vote');
var trend;

let months = [ "janv", "fev", "mars", "avril", "mai","juin","juill","août","sept","oct","nov","dec"];

module.exports.getReportBetweenDate = function (req, res) {
    var report = {};

    var unformatedDateBegin = req.params.begin;
    var unformatedDateBeginYear = unformatedDateBegin.substring(0,4);
    var unformatedDateBeginMonth = unformatedDateBegin.substring(4,6);
    var unformatedDateBeginDay = unformatedDateBegin.substring(6,8);

    var unformatedDateEnd = req.params.end;
    var unformatedDateEndYear = unformatedDateEnd.substring(0,4);
    var unformatedDateEndMonth = unformatedDateEnd.substring(4,6);
    var unformatedDateEndDay = unformatedDateEnd.substring(6,8);

    var dateBegin = new Date(unformatedDateBeginYear,unformatedDateBeginMonth-1,unformatedDateBeginDay);
    var dateEnd = new Date(unformatedDateEndYear,unformatedDateEndMonth-1,parseInt(unformatedDateEndDay)+1);
 
    Vote.find({"date" : {"$gte": new Date(dateBegin), "$lte": new Date(dateEnd)}}, function (err, result) {
        if(!err){
            // Total votes
            report.nbVote = result.length;

            // Filter vote by 'mood'
            report.repart = {};
            report.repart.overjoyed= result.filter(vote => vote.mood === 'overjoyed').length;
            report.repart.happy= result.filter(vote => vote.mood === 'happy').length;
            report.repart.neutral= result.filter(vote => vote.mood === 'neutral').length;
            report.repart.annoyed= result.filter(vote => vote.mood === 'annoyed').length;
            report.repart.angry= result.filter(vote => vote.mood === 'angry').length;

            // Calculate trend
            report.trend = calculTrendByDay(dateBegin, dateEnd, result);
          
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
            report.comments = [];
            for(r=0; r < result.length; r++){
                if ( result[r].comment !== undefined) {
                    let dateFormat = result[r].date.getDate() +  " " + months[result[r].date.getMonth()] + " " + result[r].date.getFullYear();
                    report.comments.push(dateFormat + " - " + result[r].comment);
                }
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
        if(voteByDay.length > 0){
            trend[d]= voteByDay.filter(vote => vote.mood === "overjoyed").length * 5 
                +   voteByDay.filter(vote => vote.mood === "happy").length * 4 
                +   voteByDay.filter(vote => vote.mood === "neutral").length * 3 
                +   voteByDay.filter(vote => vote.mood === "annoyed").length * 2
                +   voteByDay.filter(vote => vote.mood === "angry").length;

            trend[d] = trend[d] / voteByDay.length;
        }
        else{
            trend[d] = 0;
        }
    }

    return trend;
}
