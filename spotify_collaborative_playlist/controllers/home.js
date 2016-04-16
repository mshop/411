/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) {
    //return res.redirect('/');
    //console.log(req.user);
    res.render('home', {
      title: 'Home'
    });
  }
  else{
    res.render('account/login', {
      title: 'Login'
    });
  }
};

