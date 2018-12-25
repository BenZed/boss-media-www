import App from '@benzed/app' // eslint-disable-line no-unused-vars

import * as services from './services'
import * as processes from './processes'
import * as temp from './temp'

import Website from '../ui/root'

/* @jsx App.declareEntity */
/* eslint-disable react */

// eslint-disable-next-line no-unused-vars

/******************************************************************************/
//
/******************************************************************************/

// const hardcodeServiceData = async (app, req) => {
//
//   const [ playlists, videos ] = await Promise.all([
//     app.service('playlists').find({ paginate: false }),
//     app.service('videos').find({ paginate: false })
//   ])
//
//   return { playlists, videos }
//
// }

/******************************************************************************/
// Main
/******************************************************************************/

const BossMediaServer = ({ port, logging, youtube }) =>

  <app port={port} logging={logging}>

    <express />

    <services.playlists />
    <services.videos />
    <processes.populate
      youtube={youtube}
    />

    {/* <serve-ui
      component={Website}
      html='./dist/public/index.html'
      serializer={hardcodeServiceData}
    /> */}

    <temp.serveStatic src='./dist/public' />

    <express-error />

  </app>

/******************************************************************************/
// Exports
/******************************************************************************/

export default BossMediaServer
