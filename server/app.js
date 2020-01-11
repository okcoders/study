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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
      const profile = profileResponse.data
      const parsed = eventResponse.data.filter(d => d.type === "PushEvent").map(d => d.payload.commits)
      const flattened = _.flatten(parsed)
      const latestCommits = flattened.map(d => d.message)
      const responseData = {
        name: profile.name,
        login: profile.login,
        followers: profile.followers,
        public_repos: profile.public_repos,
        avatar_url: profile.avatar_url,
        commitMessages: latestCommits
      }
      res.json(responseData)
    })
  }).catch(e => console.error(e))
})

async function getProfileAndEvents(username) {
  const eventResponse = await axios.get(
    `https://api.github.com/users/${username}/events`, 
    {headers: { Authorization: 'token ' + token }})

  const profileResponse = await axios.get(
      `https://api.github.com/users/${username}`, 
      {headers: { Authorization: 'token ' + token }})

  const profile = profileResponse.data
  const pushEvents = eventResponse.data.filter(d => d.type === "PushEvent")
  const parsed = pushEvents.map(pushEvent => {
    return pushEvent.payload.commits.map(commit => ({...commit, createdAt: pushEvent.created_at}))
  })
  const flattened = _.flatten(parsed)
  const latestCommitDate = flattened.map(c => new Date(c.createdAt)).sort((a, b) => b - a)[0]
  const responseData = {
    name: profile.name,
    username: profile.login,
    numberOfCommits: flattened.length,
    latestCommitDate
  }
  return responseData
}

app.get('/api/github-profiles', async (req, res) => {
  const usernames = ['zmays', 'almills1972', 'hamza-zoumhani', 'johnmwaura08', 'julesep3', 'rbaptiste23', 'robdacoda']
  const usernamePromises = usernames.map(getProfileAndEvents)
  const data = await Promise.all(usernamePromises)
  console.log(data)
  res.json(data)
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.error(err)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
