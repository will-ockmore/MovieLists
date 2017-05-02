/* eslint-disable no-var, vars-on-top */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var getClientEnvironment = require('./env');
var paths = require('./paths.js');

// config for webpack dev server.
// see also: scripts/startDevServer.js

var publicUrl = '';
var env = getClientEnvironment(publicUrl);

var publicPath = paths.devServerAddr + '/';

module.exports = {
    entry: [
    // special entry point for HMR
    'webpack/hot/dev-server',

    // bundle for the dev server,
    // and connect to the required endpoint
    'webpack-dev-server/client?' + paths.devServerAddr,

    // entry point for the app
    paths.appIndexJs,
  ],

  devtool: 'inline-eval-cheap-source-map',

  output: {
    // where to output bundled files
    path: paths.buildDir,

    // output bundle name
    filename: '[name]-[hash].js',

    // where webpack will serve files on our server.
    // necessary for HMR to know where to find the bundled chunks.
    publicPath: publicPath,
  },

  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.sourceDir,
      },
    ],

    loaders: [
      // Babel compilation
      {
        test: /\.(js|jsx)$/,
        include: paths.sourceDir,
        loader: 'babel',
      },

      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss'
      },

    ],
  },

  // We use PostCSS for autoprefixing only.
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },

  plugins: [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env),

    // necessary for hot reloading
    new webpack.HotModuleReplacementPlugin(),

    // creates index.html from template specified,
    // including script and style tags.
    new HtmlWebpackPlugin({
      template: paths.appIndexHtmlTemplate,
      inject: 'body',
    }),

    // shows us helpful module names when recompiling HMR
    new webpack.NamedModulesPlugin(),
  ],

};
