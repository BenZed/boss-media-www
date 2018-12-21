import App from '@benzed/app' // eslint-disable-line no-unused-vars
import * as services from './services'
import populate from './populate-from-youtube'

/* @jsx App.declareEntity */
/* eslint-disable react */

// eslint-disable-next-line no-unused-vars
const youtube = { populate }

/******************************************************************************/
// Main
/******************************************************************************/

const BossMediaServer = ({ port, logging, youtube }) =>

  <app port={port} logging={logging}>

    <express />

    <services.playlists />
    <services.videos />
    <youtube.populate youtube={youtube} />

    <express-error />

  </app>

/******************************************************************************/
// Exports
/******************************************************************************/

export default BossMediaServer
