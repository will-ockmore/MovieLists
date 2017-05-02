/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
var chalk = require('chalk');

process.env.NODE_ENV = 'development';

// load env variables
require('dotenv').config({ silent: true });

var runDevServer = require('./startDevServer.js');


runDevServer()
  .catch(err => console.log(chalk.red(err.stack)));
