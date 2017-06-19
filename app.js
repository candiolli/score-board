var express = require('express');
var app = express();
var url = require('url');
var querystring = require('querystring');
var scores = [];

app.get('/input', function (req, res) {
    
    var params = querystring.parse(url.parse(req.url).query);
    if ('score' in params) {
        scores.push(params['score']);
        res.send('scores: ' + scores);
    } else {
        res.send('Do you need invite a socre!');
    }

});

app.get('/output', function (req, res) {
    scores.forEach(function(sc) {
        res.send('scores:' + sc);
    });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});