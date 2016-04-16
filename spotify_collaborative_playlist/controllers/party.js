var request = require('request');
var mongoose = require('mongoose');
var Party = require('../models/Party');

exports.makeParty = function(req, res) {
  if (req.user) {

    // implement a check to see if user is already part of a party first (here)


    //then if not, create new party
    var result = new Party();

    result.song_ids = [];
    result.user_ids.push(req.user.tokens[0].accessToken)

    result.save(function (err, result) {
      if (err) return console.error(err);
      console.log(result);
      //res.redirect('/');
      res.redirect('/');

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

