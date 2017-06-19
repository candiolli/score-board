var fs = require('fs');
var readline = require('readline');

var scoreBoard = module.exports = {

    readInput: function (dir) {
        var testCases = [];
        var testCase = {
            id : null, scores : []
        };

        var rd = readline.createInterface({
            input: fs.createReadStream(dir + '/input.txt'),
            output: process.stdout,
            console: true
        });

        rd.on('line', function(line) {
    
            if (line.length == 1 && testCase.id != line) {

                testCase = {
                    id : line,
                    scores : []
                };

                testCases.push(testCase);

            } else if (line.length > 1 && testCase.id != null) {

                var aux = line.split(' ');
                var people = aux[0];
                var problem = aux[1];
                var time = aux[2];
                var result = aux[3];

                testCase.scores.push({
                    people : people,
                    problem : problem,
                    time : time,
                    result : result
                });

            }
        });

        rd.on('close', function() {
            var outputs = [];

            testCases.forEach(function(testCase){

                outputs = [];

                testCase.scores.forEach(function(score){

                    var people = {
                        id : null,
                        totalProblemas : 0,
                        totalTime : 0
                    };

                    if (people.id == null || people.id != score.people) {
                        var exists = false;

                        outputs.forEach(function(ot){
                            if (ot.id == score.people) {
                                people = ot;
                                exists = true;
                            }
                        });

                        if (!exists) {
                            people.id = score.people;
                            people.totalProblemas = 0;
                            people.totalTime = 0;

                            outputs.push(people);
                        }
                    }

                    if (people.id != null) {
                        if (score.result == 'C') {
                            people.totalTime += parseInt(score.time);
                            people.totalProblemas += 1;
                        } else if (score.result == 'I') {
                            people.totalTime += 20;
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