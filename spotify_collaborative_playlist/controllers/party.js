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
      res.render('party', {partyid: req.params.partyid})
    }
  });
};

exports.postSong = function (req, res) {
  Party.findOne({ "_id" : req.params.partyid }, function (err, party){
    if (party.song_ids.indexOf(req.params.songid) > -1) {
      console.log('Song already in queue');
    }
    else {
      party.song_ids.push(req.params.songid);
      console.log(party.song_ids);
      party.save();
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



