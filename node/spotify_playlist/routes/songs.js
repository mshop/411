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
      var json_body = JSON.parse(body)
      console.log(json_body.tracks.items)
      res.render('song', { tracks: json_body.tracks.items});
    }
  });


});

module.exports = router;
