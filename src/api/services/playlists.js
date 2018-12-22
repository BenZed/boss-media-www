import App from '@benzed/app' // eslint-disable-line no-unused-vars
import { disallow } from 'feathers-hooks-common'

/* @jsx App.declareEntity */
/* eslint-disable react */

/******************************************************************************/
// Main
/******************************************************************************/

const Playlists = () =>

  <service name='playlists' multi>

    <hooks before update patch>
      {disallow()}
    </hooks>

    <hooks before create remove>
      {disallow('external')}
    </hooks>

  </service>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Playlists
