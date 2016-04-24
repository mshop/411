var request = require('request');
var mongoose = require('mongoose');
var Party = require('../models/Party');
var SearchResult = require('../models/SearchResult');

exports.postParty = function(req, res) {
  if (req.user) {

    // implement a check to see if user is already part of a party first (here)
    //then if not, create new party
    var result = new Party();

    result.song_ids = [];
    result.user_ids.push(req.user.tokens[0].accessToken);
    result.host_id = req.user.id;
    result.qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/party/" + result._id;



    result.save(function (err, result) {
      if (err) return console.error(err);
      console.log(result);
      // from http://goqr.me/api/
      var url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/party/" + result._id;
      console.log(url);
      //res.redirect('/');
      res.redirect('/party/' + result._id);

      //mongoose.disconnect();  --> might need to add callback function; as this could cause too many connections
      // to be open at mongo at once...
    });
  }
  else{
    res.render('account/login', {
      title: 'Login'
    });
  }
};

exports.getParty = function (req, res) {

  if (req.params.partyid == null) {
    req.flash('errors', {msg: "party cannot be null"});
    res.redirect('/');
  }

      Party.findOne({"_id": req.params.partyid}, function (err, party) {
        if ((err) || (party == null) ) {
          //res.render('party', {partyid: "Party Not Found"}) //--> this displays the search function: aka-- not good
          req.flash('errors', {msg: "Could not find party id."});
          res.redirect('/');

        }
        else {
          res.render('party', {partyid: req.params.partyid});
          // we should probably try to make the party results (the queue) into a view then just display the view via render;
          // otherwise, the only way to see the queue is by adding a song to it;
          // if you refresh the page, the queue disappears
          /*
           party.song_ids.sort(function(a,b) {
           return b.votes - a.votes;
           });
           res.send(party.song_ids);
           */

          //console.log(party.song_ids);

        }
      });

};

// *** NOTE: MAY NEED TO CHANGE TO UPDATE FUNCTION INSTEAD (for upvote/downvote only)
// See this: http://stackoverflow.com/questions/33640677/mongodb-update-upon-button-click

function CompareSongs(a,b) {
  if (a.votes > b.votes) {
    return -1;
  }
  else if (a.votes < b.votes) {
    return 1;
  }
  else {
    return 0;
  }
}

exports.apiVoteSong = function(req, res) {
  // Party.findOne({ "_id" : req.params.partyid }, function (err, party){
  //   console.log(party.song_ids[party.song_ids.indexOf(req.params.songid)]);
  //   res.send(party.song_ids);
  // });
  Party.findOne({ "_id" : req.params.partyid }, function (err, party){
    console.log(party.song_ids);

    for (i = 0; i < party.song_ids.length; i++) {
      if (party.song_ids[i].songid == req.params.songid) {
        if (req.params.vote == "down") {
            party.song_ids[i].votes--;
            party.save();

        }
        else if (req.params.vote == "up") {
          party.song_ids[i].votes++;
          party.save();
        }
      }
    }
    console.log(party.song_ids);
    res.send(party.song_ids.sort(CompareSongs));
  });
};



exports.postSong = function (req, res) {
  Party.findOne({ "_id" : req.params.partyid}, function (err, party){
    //console.log("party found:" + party);
    // if we found the party (a null party shouldn't happen, but just in case);
    if (party != null) {
      // search if this party has the song already
      Party.findOne({ "_id" : req.params.partyid , "song_ids.songid" : req.params.songid}, function (err, song) {
        if (song != null) {       // we got some results, therefore song exists, so don't add it again!
          console.log('Song already in queue');
        }
        else {
          // song not found; so add it
          SearchResult.find({"id": req.params.songid}, function (err, result) {
            party.song_ids.push({songid: req.params.songid, votes: 0, name: result[0].name, artists: result[0].artists});
            party.save();
          });

        }

      });
    }

  });
  res.end();
};

exports.apiGetParty = function (req, res) {
  Party.findOne({ "_id" : req.params.partyid }, function (err, party){
    if ((err) || (party == null) ) {
      req.flash('errors', {msg: "something went wrong."});
      res.redirect('/');
    }
    else {
      console.log("I'm here");
      console.log(party.song_ids);
      res.send(party.song_ids.sort(CompareSongs));
    }
  });

};



