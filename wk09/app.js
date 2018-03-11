var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);




function calculateRate(p) {	
	if (p.mailType === 'Letters (Stamped)'){
		if (p.mailWeight <=1) {
			return '$0.50';
		} else if (p.mailWeight <=2) {
			return '$0.71';
		} else if (p.mailWeight <=3) {
			return '$0.92';
		} else if (p.mailWeight <=3.5) {
			return '$1.13';
		} else {
			return 'Weight limit exceeded. Please select Large Envelopes (Flats)';
		}
    } else if (p.mailType === 'Letters (Metered)'){
		if (p.mailWeight <=1) {
			return '$0.47';
		} else if (p.mailWeight <=2) {
			return '$0.68';
		} else if (p.mailWeight <=3) {
			return '$0.89';
		} else if (p.mailWeight <=3.5) {
			return '$1.10';
		} else {
			return 'Weight limit exceeded. Please select Large Envelopes (Flats)';
		}
    } else if (p.mailType === 'Large Envelopes (Flats)'){
		if (p.mailWeight <=1) {
			return '$1.00';
		} else if (p.mailWeight <=2) {
			return '$1.21';
		} else if (p.mailWeight <=3) {
			return '$1.42';
		} else if (p.mailWeight <=4) {
			return '$1.63';
		} else if (p.mailWeight <=5) {
			return '$1.84';
		} else if (p.mailWeight <=6) {
			return '$2.05';
		} else if (p.mailWeight <=7) {
			return '$2.26';
		} else if (p.mailWeight <=8) {
			return '$2.47';
		} else if (p.mailWeight <=9) {
			return '$2.68';
		} else if (p.mailWeight <=10) {
			return '$2.89';
		} else if (p.mailWeight <=11) {
			return '$3.10';
		} else if (p.mailWeight <=12) {
			return '$3.31';
		} else if (p.mailWeight <=13) {
			return '$3.52';
		} else {
			return 'Weight limit exceeded. ';
		}
    } else if (p.mailType === 'First-Class Package Service—Retail'){
		if (p.mailWeight <=4) {
			return '$3.50';
		} else if (p.mailWeight <=8) {
			return '$3.75';
		} else if (p.mailWeight <=9) {
			return '$4.10';
		} else if (p.mailWeight <=10) {
			return '$4.45';
		} else if (p.mailWeight <=11) {
			return '$4.80';
		} else if (p.mailWeight <=12) {
			return '$5.15';
		} else if (p.mailWeight <=13) {
			return '$5.50';
		} else {
			return 'Weight limit exceeded. ';
		}
    }			
}
			
app.post('/result', function(req, res) {
  var params = {
    mailType: req.body.mailType,
    mailWeight: parseFloat(req.body.mailWeight)
	}
  console.log (params);
  params.result = calculateRate(params);
  console.log (params);
  res.render('results', params)
})		

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
