var request = require('request');
var mongoose = require('mongoose');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) {
    //console.log(req.url);
    //console.log(req.query.query);
    if(req.query.query != null){
      if (req.query.query.length == 24) {
        var reg = /^[a-z0-9]+$/i;
        console.log(reg.test(req.query.query));
        // console.log("woohoo!");
        if (!(reg.test(req.query.query))) {
          req.flash('errors', {msg: "party id must be alpha-numerical; cannot contain special characters."});
          res.redirect('/');
        }
        else {
          res.redirect('/party/' + req.query.query);
        }
      }
      else{
        req.flash('errors', {msg: "party id must be exactly 24 characters long."});
        res.redirect('/');
      }
    }
    else {
      //console.log(req.user);
      res.render('home', {
        title: 'Home'
      });
    }
  }
  else{
    res.render('account/login', {
      title: 'Login'
    });
  }
};


