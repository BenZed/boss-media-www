import App from '@benzed/app' // eslint-disable-line no-unused-vars
import { disallow } from 'feathers-hooks-common'

/* @jsx App.declareEntity */
/* eslint-disable react/react-in-jsx-scope */

/******************************************************************************/
// Main
/******************************************************************************/

const Service = ({ name, children }) =>

  <service name={name}>

    <hooks before update patch remove>
      {disallow()}
    </hooks>

    <hooks before create>
      {disallow('external')}
    </hooks>

    {children}

  </service>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Service
