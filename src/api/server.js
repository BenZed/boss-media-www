import App from '@benzed/app' // eslint-disable-line no-unused-vars

import * as services from './services'
import * as processes from './processes'

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

const wtf = app => console.log(app)

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
