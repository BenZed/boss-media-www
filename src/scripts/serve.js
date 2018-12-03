import path from 'path'
import fs from 'fs-extra'

/* @jsx App.declareEntity */
/* eslint-disable react/react-in-jsx-scope */

/******************************************************************************/
// Setup
/******************************************************************************/

// HACK
// Remove this once the @benzed modules are 1.0. If this is running in non-production
// and the benzed-mono repo is installed, we'll require @benzed modules from there
// rather than node_modules.
const BENZED = path.resolve(process.cwd(), '../benzed-mono')

if (process.env.NODE_ENV !== 'production' && fs.existsSync(BENZED)) {
  const BENZED_PKG = path.join(BENZED, 'packages')

  const { addAlias } = require('module-alias')
  for (const name of fs.readdirSync(BENZED_PKG)) {
    const url = path.join(BENZED_PKG, name)
    addAlias(`@benzed/${name}`, url)
  }
}

const App = require('@benzed/app')
const BossMediaServer = require('../api').default

/******************************************************************************/
// Execute
/******************************************************************************/

const config = App.getConfig()

App.run(<BossMediaServer {...config} />)
