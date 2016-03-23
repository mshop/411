var express = require('express');
var router = express.Router();

/* this webside might be helpful for login: http://jsfiddle.net/JMPerez/62wafrm7/   */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Spotify Queue' });
});

router.post('/songs', function (req, res) {
  console.log(req.body.title);
  res.send('Post page');
});
module.exports = router;
