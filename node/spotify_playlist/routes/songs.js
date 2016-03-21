var express = require('express');
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {

  var url = 'https://api.spotify.com/v1/search?q=' + req.query.q +"&type=track&market=US"
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body) // Show the HTML for the Google homepage.
      json_body = bodyParser.json(body)
      console.log(body.type)
    }
  });

  res.render('index', { title: req.query.q });
});

module.exports = router;
