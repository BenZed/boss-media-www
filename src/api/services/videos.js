import App from '@benzed/app' // eslint-disable-line no-unused-vars
import { disallow } from 'feathers-hooks-common'

/* @jsx App.declareEntity */
/* eslint-disable react */

/******************************************************************************/
// Main
/******************************************************************************/

const PlaylistService = () =>

  <service name='videos'>

    <hooks before update patch remove>
      {disallow()}
    </hooks>

    <hooks before create>
      {disallow('external')}
    </hooks>

  </service>

/******************************************************************************/
// Exports
/******************************************************************************/

export default PlaylistService
