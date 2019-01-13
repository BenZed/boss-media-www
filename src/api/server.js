import App from '@benzed/app' // eslint-disable-line no-unused-vars

import * as services from './services'
import * as processes from './processes'

import is from 'is-explicit'

// import Website from '../ui/root'

/* @jsx App.declareEntity */
/* eslint-disable react */

// eslint-disable-next-line no-unused-vars

/******************************************************************************/
// Serialize
/******************************************************************************/

const hardcodeServiceData = async (req, res) => {

  const app = req.socket.server._events.request

  const [ playlists, videos ] = await Promise.all([
    app.service('playlists').find({ paginate: false }),
    app.service('videos').find({ paginate: false })
  ])

  return { playlists, videos }

}

/******************************************************************************/
// TODO Remove when you figure out wtf is wrong heroku side
/******************************************************************************/

const METHODS = [
  'get', 'set', 'configure', 'use', 'service'
]

function isApp (app) {
  if (this !== undefined)
    app = this

  return is.object(app) && METHODS.every(method => is.func(app[method]))

}

const wtf = app => {

  const result = app::isApp()
  if (result)
    console.log('definetly is an app')
  else if (!is.object(app))
    console.log('app is not considered an object???')
  else for (const method of METHODS)
    if (!is.func(app[method]))
      console.log(`app ${method} is not a function`)

}

/******************************************************************************/
// Main
/******************************************************************************/

const BossMediaServer = ({ port, logging, youtube }) =>

  <app port={port} logging={logging}>

    {wtf}

    <express />

    <services.playlists />
    <services.videos />
    <processes.populate
      youtube={youtube}
    />

    <express-ui
      public='./dist/public'
      // component={Website} FIXME for some reason, styles are missing when rendered via ssr
      serialize={hardcodeServiceData}
    />

    <express-error />

  </app>

/******************************************************************************/
// Exports
/******************************************************************************/

export default BossMediaServer
