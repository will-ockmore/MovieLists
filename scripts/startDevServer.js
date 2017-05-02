/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
var webpack = require('webpack');
var openBrowser = require('react-dev-utils/openBrowser');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var chalk = require('chalk');
var WebpackDevServer = require('webpack-dev-server');

var paths = require('../config/paths.js');
var config = require('../config/webpack.config.dev.js');
var checkForPort = require('./checkForPort.js');

function setupCompiler() {
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  var compiler = webpack(config);

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    console.log('Compiling...');
  });

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', (stats) => {
    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    var messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('Compiled successfully!'));
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
    }
  });

  return compiler;
}

function runDevServer(port) {
  var compiler = setupCompiler();
  var devServer = new WebpackDevServer(compiler, {
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',

    // match the output path
    contentBase: config.output.path,

    // this should match the output publicPath
    publicPath: config.output.publicPath,

    // supress all log output from webpack -
    // it is dealt with above in setupCompiler
    quiet: true,

    // enable hot module replacement
    hot: true,
  });

  // Launch WebpackDevServer.
  devServer.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log(chalk.cyan('Starting the development server on port ') + chalk.yellow.bold(port));
    openBrowser('http://localhost:' + port + '/');
  });
}

function run() {
  return checkForPort(paths.devServerPort)
    .then(runDevServer);
}

module.exports = run;
