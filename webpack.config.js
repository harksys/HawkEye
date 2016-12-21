const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry   : './src/js/App.ts',
  output  : {
    path     : path.resolve('./'),
    filename : 'app.min.js'
  },
  resolve : {
    root       : [
      path.resolve('./node_modules'),
      path.resolve('./src/js')
    ],
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
      loader : 'ts-loader?sourceMap=false&configFileName=tsconfig.json'
    }, {
      test   : /\.css$/,
      loader : 'style!css'
    }, {
      test   : /\.(otf|eot|svg|ttf|woff|woff2).*$/,
      loader : 'url?limit=8192'
    }]
  },
  plugins : [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
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