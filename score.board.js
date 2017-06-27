var fs = require('fs');
var readline = require('readline');
var Score = require('./Score.js');
var TestCase = require('./TestCase.js');
var Output = require('./Output.js');

var scoreBoard = module.exports = {

    readInput: function (dir) {
        var testCases = [];
        let scores = [];
        var testCase = new TestCase(null, []);

        var rd = readline.createInterface({
            input: fs.createReadStream(dir + '/input.txt'),
            output: process.stdout,
            console: true
        });
        
        rd.on('line', function(line) {
            scores.push(function() {
                if (line.length == 1) {
                    return new Score(line);
                } else {
                    return new Score(null, ...line.split(' '));
                }
            })
        });

        rd.on('close', function() {
            console.log('scores: ', scores);
            // var outputs = [];

            // scores.forEach(function(score){

        //         outputs = [];

        //         testCase.scores.forEach(function(score){

        //             var out = new Output(null, 0, 0);

        //             if (out.id == null || out.id != score.people) {
        //                 var exists = false;

        //                 outputs.forEach(function(ot){
        //                     if (ot.id == score.people) {
        //                         out = ot;
        //                         exists = true;
        //                     }
        //                 });

        //                 if (!exists) {
        //                     outputs.push(new Output(score.people, 0, 0));
        //                 }
        //             }

        //             if (out.id != null) {
        //                 if (score.result == 'C') {
        //                     out.totalTime += parseInt(score.time);
        //                     out.totalProblemas += 1;
        //                 } else if (score.result == 'I') {
        //                     out.totalTime += 20;
        //                 }
        //             }
                    
        //         });

        //         outputs.forEach(function(t) {
        //             var nameFile = dir + '/output'+testCase.id+'.txt';
        //             fs.unlink(nameFile, function() {
        //                 fs.appendFile(nameFile, t.id + ' ' + t.totalProblemas + ' ' + t.totalTime + ' \r\n');
        //             });
        //         });
            // });

        });
       
    }

}