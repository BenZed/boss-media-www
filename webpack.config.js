// const { WebpackConfig } = require('@benzed/dev')
const path = require('path')

/******************************************************************************/
// Production
/******************************************************************************/
// const webpackConfig = new WebpackConfig({
//   port: 5000
// })

/******************************************************************************/
// DEV
/******************************************************************************/

// TODO Remove this once @benzed packages are all done
const fs = require('fs')

const BENZED = path.resolve(__dirname, '../benzed-mono')
const BENZED_NM = path.resolve(BENZED, 'bootstrap', 'node_modules')
const BENZED_PKG = path.resolve(BENZED, 'packages')

const names = fs.readdirSync(BENZED_PKG)

// Create Webpack Config From Dev
const { WebpackConfig } = require(path.join(BENZED_PKG, 'dev'))
const webpackConfig = new WebpackConfig({
  port: 5500
})

// Resolve BenZed node_modules
webpackConfig.resolve.modules = [ 'node_modules', BENZED_NM ]
webpackConfig.resolve.alias = {}

// Alias BenZed Packages
for (const name of names)
  webpackConfig.resolve.alias[`@benzed/${name}`] = path.join(BENZED_PKG, name)

webpackConfig.resolve.alias['styled-components'] = path.join(BENZED_NM, 'styled-components')

/******************************************************************************/
// Exports
/******************************************************************************/

module.exports = webpackConfig
