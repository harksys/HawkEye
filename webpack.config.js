const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry   : './src/App.ts',
  output  : {
    path     : path.resolve('./'),
    filename : 'app.min.js'
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
    new webpack.optimize.UglifyJsPlugin({
      minimize : true,
      output   : {
        comments : false
      },
      compress : {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
};