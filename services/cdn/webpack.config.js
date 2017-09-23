var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log('Searching', path.resolve('./src/js/components'))

module.exports = {
  entry: {
     login: "./src/js/screen/login"
  },
  output: {
     path: path.join(__dirname, "dist/js"),
     filename: "[name].bundle.js"
  },
  externals: {
    "jquery": "jQuery",
    "materialize": "materialize"
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    modules: [path.resolve('./src/js/components'), "node_modules"]
  }
};
