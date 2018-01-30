var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose')

var app = express();

// 添加配置文件
var config = require('config.json')('./config.json')
var dbUrl = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db

// 数据库连接
mongoose.connect(dbUrl, { useMongoClient: true }, function (err) {
  if (err) console.log(err)
})
mongoose.set('debug', true)

// express 中间件设置
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_components')));

// 设置session
app.use(session({
  secret: config.secret,
  store: new mongoStore({
    url: dbUrl,
    collection: "sessions"
  }),
  resave: false,
  saveUninitialized: true,
}))

// 路由配置
var corsOptions = {
  origin: config.origin,
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
var webRoutes = require('./config/routes')
app.use('/', webRoutes)



// 错误异常处理
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.json('error');
});

module.exports = app;
