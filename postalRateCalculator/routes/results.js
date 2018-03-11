var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/rateForm', function(req, res, next) {
  res.render('rateForm', { title: 'Postal Rate Calculator' });
});

module.exports = router;