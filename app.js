var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require("cors")
var session=require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newuserRouter = require('./routes/newuser');
var courseRouter=require('./routes/course');
var feesRouter=require('./routes/fees');
var batchtimeRouter=require('./routes/batchtime');
var batchesRouter=require('./routes/batches');
var studentRouter=require('./routes/student');
var studentrrRouter=require('./routes/studentrr');
var adminRouter=require('./routes/admin')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave:true,saveUninitialized:true,secret:'1245'}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/new', newuserRouter);
app.use('/course', courseRouter);
app.use('/fees', feesRouter);
app.use('/batchtime',batchtimeRouter);
app.use('/batch',batchesRouter);
app.use('/student',studentRouter);
app.use('/studentrr',studentrrRouter);
app.use('/admin',adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
