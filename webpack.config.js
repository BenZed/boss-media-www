const webpack = require('webpack') //eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:5000',
    './src-client/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url?limit=10000'
      },

      {
        test: /\.(ttf|eot|ico|png|gif|mp4|jpg)$/,
        loader: 'file'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loaders: ['html']
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist-client',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src-client',
    hot: false
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      is: 'is-explicit',
      React: 'react'
    })
  ]
}
