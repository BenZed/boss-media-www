const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/client/index.js')
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(ttf|eot|ico|png|gif|mp4|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules'
    ]
  },
  output : {
    path: path.resolve(__dirname, '../dist/public/assets'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}
