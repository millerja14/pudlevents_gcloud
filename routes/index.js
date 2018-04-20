var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Pudlevents', partials: {head: 'head', header: 'header'}});
});

module.exports = router;
