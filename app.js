var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors=require("cors")
var app = express();
const helmet = require("helmet");
var loginRouter=require("./routes/auth/login")
var signUpRouter=require("./routes/auth/SignUp")
var profileRouter=require("./routes/auth/profile")
var indexRouter = require('./routes/index');
var campaignRouter=require("./routes/campaigns/campaigns")
var mediaRouter=require("./routes/Media/Media")
var paymentRouter=require("./routes/StripePayment/StripePayment")
var donorRouter=require("./routes/donors/donors")
var conn=require("./src/database/database")
require("dotenv").config()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use("/auth/login",loginRouter)
app.use("/auth/signUp",signUpRouter)
app.use("/auth/profile",profileRouter)
app.use("/api/media",mediaRouter)
app.use("/image",express.static(path.join("./src/image")))
app.use("/media/image",express.static(path.join("./src/media/image")))
app.use("/avatar",express.static(path.join("./src/media/avatar")))
app.use("/api",campaignRouter)
app.use("/api",paymentRouter)
app.use("/",indexRouter)
app.use("/api",donorRouter)
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

conn
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
