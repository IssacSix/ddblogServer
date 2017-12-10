var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose')

var app = express();
var dbUrl = 'mongodb://127.0.0.1:27017/movies'

mongoose.connect(dbUrl, { useMongoClient: true}, function (err) {
  if (err) console.log(err)
})
mongoose.set('debug', true)

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_components')));

// 设置session
app.use(session({
  secret: 'ddblog',
  store: new mongoStore({
    url: dbUrl,
    collection: "sessions"
  }),
  resave: false,
  saveUninitialized: true,
}))

// 路由配置
var corsOptions = {
  origin: 'http://192.168.0.101:8080',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
var webRoutes = require('./config/routes')
app.use('/', webRoutes)


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
  console.log(err)
  res.json('error');
});

module.exports = app;
