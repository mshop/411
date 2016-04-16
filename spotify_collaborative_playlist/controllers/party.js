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
      res.redirect('/viewparty/' + result._id);

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

exports.postPartySong = function (req, res) {
  Party.findOne({ "_id" : req.param("partyid") }, function (err, party){
    party.song_ids.push(req.param("songid"));
    console.log(party.song_ids);
    party.save();
  });
  res.end();
};

exports.getParty = function (req, res) {
  Party.findOne({ "_id" : req.param("partyid") }, function (err, party){
    console.log("I'm here");
    console.log(party.song_ids);
    res.send(party.song_ids);
  });
};

exports.getPartyView = function (req, res) {

  Party.findOne({"_id": req.param("partyid")}, function(err, result) {
    if (err) res.render('party', {partyid: "Party Not Found"})
    else {
      res.render('party', {partyid: req.param("partyid")})
    }
  });
};

