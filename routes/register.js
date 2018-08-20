var createError = require('http-errors');///
var express = require('express'); //
var path = require('path');//route x
var cookieParser = require('cookie-parser');///
var logger = require('morgan');///
const session = require('express-session');///
const fileStore = require("session-file-store")(session);

//route x -- not yet route
const sessionMiddleware = session({
  // store: new fileStore(),
  secret: "cs546",
  cookie: {maxAge: 60000}
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//--

//not yet ----- route
app.use('/', usersRouter); 
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

module.exports = router;