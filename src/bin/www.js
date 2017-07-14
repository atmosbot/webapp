"use strict";

const app = require('../app');
const http = require('http');
const chalk = require('chalk');
const log4js = require('log4js');
const logger = log4js.getLogger();

const server = http.createServer(app);
const port = (process.env.PORT || '3000');

app.set('port', port);

server.listen(port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    logger.fatal(error);
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.fatal(bind + ' requires elevated privileges');
      throw new Error(error);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.fatal(bind + ' is already in use');
      throw new Error(error);
      process.exit(1);
      break;
    default:
      logger.fatal(error);
      throw new Error(error);
  }
});

server.on('listening', () => {
  logger.info('%s App is running at http://:127.0.0.1:%d in %s mode', chalk.green('✓'), process.env.PORT, process.env.NODE_ENV);
  logger.info('\tPress CTRL-C to stop\n');
});