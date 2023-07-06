const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
// connect to the database with AFTER the config consts are processed
require('./config/database');
// make sure you require you passport strategy files
require('./config/passport')

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews')
const performersRouter = require('./routes/performers');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); // defines req.body for us (javascript http request (unit 3))
app.use(express.urlencoded({ extended: false }));  // defines req.body for us! (form)
app.use(cookieParser());


// this creates the cookie with sid that remembers the browser that is making the http requests
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

// ALWAYS SETUP PASSPORT AFTER YOUR SESSION, because PASSPORT USES The cookie you make with the session
app.use(passport.initialize());
app.use(passport.session());

// and before the controllers ^^^^^^^ because the controllers want access to req.user! Passport defines req.user for us!


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/', reviewsRouter);
app.use('/', performersRouter);
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
