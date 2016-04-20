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
       // console.log("woohoo!");
      res.redirect('/party/' + req.query.query);
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

