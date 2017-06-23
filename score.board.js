var fs = require('fs');
var readline = require('readline');
var Score = require('./Score.js');
var TestCase = require('./TestCase.js');
var Output = require('./Output.js');

var scoreBoard = module.exports = {

    readInput: function (dir) {
        var testCases = [];
        var testCase = new TestCase(null, []);

        var rd = readline.createInterface({
            input: fs.createReadStream(dir + '/input.txt'),
            output: process.stdout,
            console: true
        });

        rd.on('line', function(line) {
    
            if (line.length == 1 && testCase.id != line) {

                testCase = new TestCase(line, []);

                testCases.push(testCase);

            } else if (line.length > 1 && testCase.id != null) {

                var aux = line.split(' ');
                var people = aux[0];
                var problem = aux[1];
                var time = aux[2];
                var result = aux[3];

                var Score = new Score(people, problem, time, result);

                testCase.scores.push(Score);
            }
        });

        rd.on('close', function() {
            var outputs = [];

            testCases.forEach(function(testCase){

                outputs = [];

                testCase.scores.forEach(function(score){

                    var Output = new Output(null, 0, 0);

                    if (Output.id == null || Output.id != score.people) {
                        var exists = false;

                        outputs.forEach(function(ot){
                            if (ot.id == score.people) {
                                Output = ot;
                                exists = true;
                            }
                        });

                        if (!exists) {
                            Output = new Output(score.people, 0, 0);
                            outputs.push(Output);
                        }
                    }

                    if (Output.id != null) {
                        if (score.result == 'C') {
                            Output.totalTime += parseInt(score.time);
                            Output.totalProblemas += 1;
                        } else if (score.result == 'I') {
                            Output.totalTime += 20;
                        }
                    }
                    
                });

                outputs.forEach(function(t) {
                    var nameFile = dir + '/output'+testCase.id+'.txt';
                    fs.unlink(nameFile, function() {
                        fs.appendFile(nameFile, t.id + ' ' + t.totalProblemas + ' ' + t.totalTime + ' \r\n');
                    });
                });
            });

        });
       
    }

}