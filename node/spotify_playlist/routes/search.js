var express = require('express');
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {


    // --> not implemented yet
    // call (here/below this line) res.render to some view that will add a search field + search button
    // --> not implemented yet
    // results of possibly already made searches
    res.render('searches', { title: 'Spotify Queue' });
});

router.post('/', function(req, res, next) {
    console.log(req.body.song)
    if ((req.body.song != null) && ((req.body.song).length > 0))  {         // search field checks out
        // var url = 'https://api.spotify.com/v1/search?q=' +"\"" +req.query.q +"\"" +"&type=track&market=US"; <-- for more "specific searches"

        var url = 'https://api.spotify.com/v1/search?q=' + req.body.song + "&type=track&market=US";

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body) // Show the HTML for the Google homepage.
                var json_body = JSON.parse(body)
                console.log(json_body.tracks.items)

                res.render('song', {tracks: json_body.tracks.items});

            }
        });

    }
    else{
        // no search has been given
        res.render('song', {tracks: "None found"});
    }
});

module.exports = router;
