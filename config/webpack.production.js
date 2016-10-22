const config = require('./webpack.default.js')
const path = require('path')

// const FaviconsPlugin = require('favicons-webpack-plugin')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
const HtmlPlugin = require('html-webpack-plugin')

config.output = {
  path: path.resolve(__dirname, '../dist-client/assets'),
  publicPath: '/',
  filename: 'bundle.js'
}

config.plugins.push(
  new HtmlPlugin({
    template: path.join(__dirname, '../src-client/production.html'),
    filename: '../index.html',
    inject: false
  }),
  // new FaviconsPlugin({
  //   logo: path.resolve(__dirname, '../favicon.png'),
  //   prefix: 'favicon-[hash]/',
  //   inject: true
  // }),
  new UglifyJsPlugin({
    mangle: false
  })
)

module.exports = config
