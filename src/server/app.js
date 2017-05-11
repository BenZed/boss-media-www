import feathers, { static as serveStatic } from 'feathers'
import configuration from 'feathers-configuration'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest'

import path from 'path'
import cors from 'cors'
import compress from 'compression'
import bodyParser from 'body-parser'
import fallback from 'express-history-api-fallback'
import favicon from 'serve-favicon'

import middleware from 'middleware'
import services from 'services'
import gears from 'modules/gears'
import fstorage from 'modules/file-storage'

import { MongoClient } from 'mongodb'

/******************************************************************************/
// Config
/******************************************************************************/

const app = feathers()
const configURL = path.resolve(__dirname, '..')
const favURL = path.resolve(__dirname, '../favicon.png')

app.configure(configuration(configURL))

const publicURL = app.get('public')
const assetsURL = path.join(publicURL, 'assets')

const url = app.get('mongodb')

export default MongoClient
  .connect(url)
  .then(db => {

    app.db = db

    return app.use(compress())
      .options('*', cors())
      .use(cors())

      .use('/assets', serveStatic(assetsURL))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(favicon(favURL))

      .configure(hooks())
      .configure(rest())
      .configure(fstorage)
      .configure(gears)
      .configure(services)
      .configure(middleware)

      .use(fallback('index.html', { publicURL }))
  })
  .catch(err => log.error(err))

/******************************************************************************/
// Exports
/******************************************************************************/
