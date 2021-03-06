var express         = require('express');
var app             = express();
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');

var conf = require('./app/config/app_conf');

var expenses = require('./app/routes/expenses');

var port = conf.port || process.env.PORT;

app.listen(port);

    // view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.set("jsonp callback", true);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + conf.db);


// Routes
app.use('/expenses', expenses);

    /// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

    /// error handlers

    // development error handler
    // will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

    // production error handler
    // no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
