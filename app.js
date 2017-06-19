var express = require('express');
var app = express();
var scoreBoard = require('./score.board.js');

app.get('/score-output', function (req, res) {
    if (req.query.dir) {
        scoreBoard.readInput(req.query.dir, function(data) {
            console.log(data);
        });
        res.send('Score Board successfully generated! Acesse: '+req.query.dir);
    } else {
        res.send('Please inform the directory, use the dir parameter.');
    }
});

app.listen(3000, function () {
  console.log('Score Board listening on port 3000!');
});