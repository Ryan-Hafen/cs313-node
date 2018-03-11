var express = require('express');
var router = express.Router();

/* GET Rates Form. */
router.get('/', function(req, res, next) {
  res.render('rateForm', { title: 'Postal Rate Calculator' });
});

module.exports = router;