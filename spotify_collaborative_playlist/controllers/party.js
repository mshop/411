var request = require('request');
var mongoose = require('mongoose');
var Party = require('../models/Party');

exports.postParty = function(req, res) {
  if (req.user) {

    // implement a check to see if user is already part of a party first (here)
    //then if not, create new party
    var result = new Party();

    result.song_ids = [];
    result.user_ids.push(req.user.tokens[0].accessToken);
    result.host_id = req.user.id;

    result.save(function (err, result) {
      if (err) return console.error(err);
      console.log(result);
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

  Party.findOne({"_id": req.params.partyid}, function(err, result) {
    if (err) res.render('party', {partyid: "Party Not Found"})
    else {
      res.render('party', {partyid: req.params.partyid })
      console.log(result.song_ids);

    }
  });
};

// *** NOTE: MAY NEED TO CHANGE TO UPDATE FUNCTION INSTEAD (for upvote/downvote only)
// See this: http://stackoverflow.com/questions/33640677/mongodb-update-upon-button-click

// *ALSO:  for some reason, after clicking upvote/downvote, this hangs and causes a loop
// of continuous voting up/down to happen (via gets); not sure how to fix at this current moment...
// But at least the fields do get updated...

// Vote up song
// exports.VUpSong = function (req, res) {
//   console.log(req.params.partyid);
//   console.log(req.params.songid);
//
//   Party.findOne({ "_id" : req.params.partyid , "song_ids.songid" : req.params.songid}, function (err, result) {
//     if (err) res.render('party', {partyid: "Party or Song Not Found"})
//     else {
//      // res.render('party', {partyid: req.params.partyid })
//       result.song_ids[0].votes++;
//       //console.log(result.song_ids);
//       result.save(function (err, result) {
//         if (err) return console.error(err);
//         else {
//           console.log("VOTE Up SUCCESS");
//           //mongoose.connection.close();
//           res.status(200).end();
//         }
//       });
//
//     }
//     //mongoose.connection.close();
//   });
//  // res.redirect('/party/' + req.params.partyid);
//
// };
//
//
// // Vote down song
// exports.VDownSong = function (req, res) {
//   console.log(req.params.partyid);
//   console.log(req.params.songid);
//
//   Party.findOne({ "_id" : req.params.partyid}, function (err, result) {
//     if (err) {
//       res.render('party', {partyid: "Party or Song Not Found"});
//     }
//     else {
//       // res.render('party', {partyid: req.params.partyid })
//       result.song_ids[0].votes--;
//       console.log(result.song_ids);
//       //console.log(result.song_ids);
//       result.save(function (err, result) {
//         if (err) {
//           console.log("VOTE Down Error");
//           res.status(404).end();
//         }
//         else {
//           console.log("VOTE Down SUCCESS");
//           //mongoose.connection.close();
//           res.status(200).end();
//         }
//       });
//
//     }
//     //mongoose.connection.close();
//   });
//  // res.redirect('/party/' + req.params.partyid);
// };

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
          if (party.song_ids[i].votes > 0) {
            party.song_ids[i].votes--;
            party.save();
          }
        }
        else if (req.params.vote == "up") {
          party.song_ids[i].votes++;
          party.save();
        }
      }
    }
    console.log(party.song_ids);
    res.send(party.song_ids);
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
          party.song_ids.push({songid: req.params.songid, votes: 0});
          //console.log(party.song_ids);
          party.save();
        }

      });
    }

  });
  res.end();
};

exports.apiGetParty = function (req, res) {
  Party.findOne({ "_id" : req.params.partyid }, function (err, party){
    console.log("I'm here");
    console.log(party.song_ids);
    res.send(party.song_ids);
  });
};



