const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry   : './src/App.ts',
  output  : {
    path     : path.resolve('./'),
    filename : 'app.js'
  },
  resolve : {
    extensions : [
      '',
      '.webpack.js',
      '.web.js',
      '.ts',
      '.js',
      '.tsx'
    ]
  },
  module  : {
    loaders : [{
      test   : /\.tsx?$/,
      loader : 'ts-loader?configFileName=tsconfig.json'
    }]
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
};