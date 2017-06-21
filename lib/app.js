const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ensureAuth = require('./auth/ensure-auth')();
const errorHandler = require('./errorHandler')();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

// const goals = require('./routes/goals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const me = require('./routes/me');

// app.use('/api/goals', goals);
// Oh no! no auth check on getting users :(
app.use('/api/users', ensureAuth, users);
app.use('/api/auth', auth);
app.use('/api/me', ensureAuth, me);

app.use(errorHandler);

module.exports = app;