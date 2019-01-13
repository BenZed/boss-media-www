const fs = require('fs')
const path = require('path')
const port = require('./config/default.json').port - 100
const TerserPlugin = require('terser-webpack-plugin')

/******************************************************************************/
// Production
/******************************************************************************/

let webpackConfig

/******************************************************************************/
// Development
/******************************************************************************/

// HACK
// This just links everything to the locally installed @benzed repos if they
// exist. Once those repos are a little more v 1.0 friendly, this can be removed.

const BENZED = path.resolve(__dirname, '../benzed-mono')

if (process.env.NODE_ENV !== 'production' && fs.existsSync(BENZED)) {

  const BENZED_HOISTED = path.resolve(BENZED, 'bootstrap', 'node_modules')
  const BENZED_PKG = path.resolve(BENZED, 'packages')
  const names = fs.readdirSync(BENZED_PKG)

  const { WebpackConfig } = require(path.join(BENZED_PKG, 'dev'))
  webpackConfig = new WebpackConfig({ port })

  // Resolve BenZed node_modules
  webpackConfig.resolve.modules = [ 'node_modules', BENZED_HOISTED ]

  // Alias BenZed Packages
  webpackConfig.resolve.alias = {}
  for (const name of names)
    webpackConfig.resolve.alias[`@benzed/${name}`] = path.join(BENZED_PKG, name)

  // Two seperate styled-components installations will fuck everything up
  webpackConfig.resolve.alias['styled-components'] = path.join(BENZED_HOISTED, 'styled-components')
  webpackConfig.resolve.alias['react-dom'] = path.join(BENZED_HOISTED, 'react-dom')

} else {

  const { WebpackConfig } = require('@benzed/dev')

  webpackConfig = new WebpackConfig({ port })
}

/******************************************************************************/
// Test
/******************************************************************************/

webpackConfig.optimization.minimizer = [
  new TerserPlugin({
    terserOptions: {
      mangle: false
    }
  })
]

/******************************************************************************/
// Exports
/******************************************************************************/

module.exports = webpackConfig
