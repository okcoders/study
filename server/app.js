<<<<<<< HEAD
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
=======
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios')
const _ = require('lodash')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const token = require('./github_token')
>>>>>>> origin/master

var app = express();
//
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
mongoose.connect("mongodb://localhost/study", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoose");
});

app.get("/api/test", (req, res) => {
  res.json("Hello World");
});
=======
// mongoose.connect('mongodb://localhost/study', {useNewUrlParser: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected to mongoose')
// });

app.get('/api/github-profile/:username', (req, res) => {
  const username = req.params.username
  axios.get(
    `https://api.github.com/users/${username}/events`, 
    {headers: { Authorization: 'token ' + token }}
  ).then(function (eventResponse) {
    axios.get(
      `https://api.github.com/users/${username}`, 
      {headers: { Authorization: 'token ' + token }}
    ).then(function (profileResponse) {
      console.log(profileResponse.data)
      console.log(eventResponse.data)
      const stub = {
        name: 'Zach Mays',
        login: 'zmays',
        followers: 100000,
        public_repos: 20,
        avatar_url: 'https://avatars0.githubusercontent.com/u/4370615?v=4',
        commitMessages: ['test']
      }
      res.json(stub)
    })
  }).catch(e => console.error(e))
})

>>>>>>> origin/master

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
<<<<<<< HEAD
  res.locals.error = req.app.get("env") === "development" ? err : {};
=======
  console.error(err)
  res.locals.error = req.app.get('env') === 'development' ? err : {};
>>>>>>> origin/master

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
