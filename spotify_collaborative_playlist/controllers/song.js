var request = require('request');
var mongoose = require('mongoose');
var SearchResult = require('../models/SearchResult');
/**
 * GET /search
 * Search form page.
 */


exports.apiGetSong = function(req, res) {
    var url = 'https://api.spotify.com/v1/tracks/' + req.params.songid;

    console.log(url)

    SearchResult.find({"id": req.params.songid}, function (err, result) {
        res.send(result[0]);
        
        // else {
        //     request(url, function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //
        //
        //             var new_results = [];
        //
        //             body_parsed = JSON.parse(body);
        //
        //             for (i = 0; i < body_parsed.tracks.items.length; i++) {
        //                 var result = new SearchResult();
        //
        //                 result.search_href = body_parsed.tracks.href;
        //                 result.song_href = body_parsed.tracks.items[i].href;
        //                 result.artists = body_parsed.tracks.items[i].artists[0].name;
        //                 result.name = body_parsed.tracks.items[i].name;
        //                 result.duration_ms = body_parsed.tracks.items[i].duration_ms;
        //                 result.id = body_parsed.tracks.items[i].id;
        //
        //                 result.save(function (err, result) {
        //                     if (err) return console.error(err);
        //                     console.log(result);
        //                 });
        //
        //                 new_results.push(result);
        //             }
        //
        //             res.send(new_results);
        //
        //
        //         }
        //         else {
        //             console.log("error");
        //         }
        //     });
        // }
    });



};

