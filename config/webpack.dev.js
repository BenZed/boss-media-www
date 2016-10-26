const path = require('path')
const config = require('./webpack.default.js')

const HtmlPlugin = require('html-webpack-plugin')

// config.entry.unshift('webpack-dev-server/client?http://0.0.0.0:5000')

config.devServer = {
  contentBase: path.resolve(__dirname, '../dist-client'),
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 4000,
  inline: true,
  hot: false
}

config.plugins.push(new HtmlPlugin({
  template: path.join(__dirname, '../src-client/development.html'),
  filename: 'index.html',
  inject: 'head'
}))

module.exports = config
