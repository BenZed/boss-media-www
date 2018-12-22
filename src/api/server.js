import App from '@benzed/app' // eslint-disable-line no-unused-vars
import * as services from './services'
import * as processes from './processes'

/* @jsx App.declareEntity */
/* eslint-disable react */

// eslint-disable-next-line no-unused-vars

/******************************************************************************/
// Main
/******************************************************************************/

const BossMediaServer = ({ port, logging, youtube }) =>

  <app port={port} logging={logging}>

    <express />

    <services.playlists />
    <services.videos />
    <processes.populate youtube={youtube} />

    <express-error />

  </app>

/******************************************************************************/
// Exports
/******************************************************************************/

export default BossMediaServer
