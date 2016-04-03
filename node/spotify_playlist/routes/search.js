var express = require('express');
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/spotify_playlist');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
    console.log("Connected to database");
});
//connect to mongodb database; *NOTE:  Make sure that mongod.exe is running, then run mongo.exe, then try connecting!
mongoose.connect('mongodb://localhost/test');

var collection = db.collection('songs');

router.post('/', function(req, res, next) {
    //console.log(req.body.song)
    if ((req.body.song != null) && ((req.body.song).length > 0)) {         // search field checks out
        // try and get info from database (and check if not null):

        // *Note: should try adding some regex to this and/ or change the first character of every word to be uppercase
        // this might allow better and more accurate searches  (however, I have tried this and did not seem to work; this might be due to
        // a bug with the library function itself; not sure yet...)
        var str = "" + req.body.song;
        //var cursor = collection.find(); --> finds all records stored
        var results = [];
        // **NOTE: there is a bug here; it seems like the cursor is not reset when we do another search (after the first one)
        // this might be because the query hangs when we do the cursor.each function; see below why the query hangs
        var cursor = collection.find({ "items.name": str });

        // ***THIS IS WHERE THE PROBLEMS START: ***
        // 1) query hangs  (this is due to the cursor.each function not being synchronous, meaning we need to have a callback to it)
        // 2) cannot display returned items due to not being able to store all the items into an array (like the results[] array) and give it to song.jade view
        if (cursor != null) {
            cursor.each(function (err, item) {
                //assert.equal(err, null);
                if(err)
                    throw err;

                if(item != null) {
                    console.log(item);
                    //results.push(item);
                }
                else {
                    // cursor.rewinds puts the cursor back to its oringal state;
                    cursor.rewind();
                    db.close();
                }
            });

           // console.log(results);
           // db.close();
        }
        else {
            console.log("data in database not found");
            // if data not found in database, then search, and save the data:
            // search:
            var url = 'https://api.spotify.com/v1/search?q=' + req.body.song + "&type=track&market=US";
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(body) // Show the HTML for the Google homepage.
                    var json_body = JSON.parse(body)
                    if (json_body.tracks.total != 0) {
                        //console.log(json_body.tracks.items)

                        //save the data
                        collection.insert(json_body.tracks.items, function (err, doc) {
                            //console.log(doc);
                            if (err) {
                                throw err;
                            }

                            db.close();
                        });

                        //display the data
                        res.render('song', {tracks: json_body.tracks.items});
                    }

                    else {
                        res.send('no results');
                    }


                }

            });

        }
    }
        else {
            // no search has been given
            res.send('no results');
        }
    });

/* GET home page. */
router.get('/', function(req, res, next) {

    // --> not implemented yet
    // call (here/below this line) res.render to some view that will add a search field + search button
    // --> not implemented yet
    // results of possibly already made searches
    res.render('searches', { title: 'Spotify Queue' });

});

module.exports = router;
