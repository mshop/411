var request = require('request');
var mongoose = require('mongoose');
var SearchResult = require('../models/SearchResult');
/**
 * GET /search
 * Search form page.
 */

exports.getSearch = function(req, res) {
  req.assert('query', 'Search query cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }
  


  var url = 'https://api.spotify.com/v1/search?query=' + req.param("query") + "&offset=0&limit=20&type=track&market=US";

  console.log(url)

  SearchResult.find({"search_href": url}, function(err, results) {
    if (err) return console.error(err);
    if (results.length > 0) {
      res.send(results);
    }
    else {

      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {


          var new_results = [];

          body_parsed = JSON.parse(body);

          for (i = 0; i < body_parsed.tracks.items.length; i++) {
            var result = new SearchResult();

            result.search_href = body_parsed.tracks.href;
            result.song_href = body_parsed.tracks.items[i].href;
            result.artists = body_parsed.tracks.items[i].artists[0].name;
            result.name = body_parsed.tracks.items[i].name;
            result.duration_ms = body_parsed.tracks.items[i].duration_ms;
            result.id = body_parsed.tracks.items[i].id;

            result.save(function (err, result) {
              if (err) return console.error(err);
              console.log(result);
            });

            new_results.push(result);
          }

          res.send(new_results);



        }
        else {
          console.log("error");
          req.flash('errors', errors);
        }
      });

    }
  });



};
