"use strict";
/**
 * Module dependencies.
 */
const dotenv = require('dotenv');
const util = require('util');
const path = require('path');
const chalk = require('chalk');
const log4js = require('log4js');
const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.load();

/**
 * Setup connection to MongoDB
 */

// const mongoUri = process.env.MONGO_URI;

// mongoose.Promise = Promise;

// mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });

// mongoose.connection.on('error', () => {
//   throw new Error('unable to connect to database: ' + mongoUri);
// });

// if (process.env.MONGO_DEBUG) {
//   mongoose.set('debug', (collectionName, method, query, doc) => {
//     debug(mongoUri, util.inspect(query, false, 20), doc);
//   });
// }

/**
 * Controllers (route handlers).
 */

const homeRoute = require('./routes/home.route');
/**
 * Create Express server.
 */
const app = express()
const router = express.Router();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Load all routes
 */
app.get('/', homeRoute);


/**
 * Error handeling
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  res.status(err.status || 500);

  if (err.status == 404) {
    res.render('404');
  } else {
    res.render('error');
  }
});

module.exports = app;