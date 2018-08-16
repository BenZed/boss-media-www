import React from 'react'
import { withRouter, matchPath } from 'react-router-dom'

import { Home, About, Vault, Videos } from '../pages'

import { Visible } from '@benzed/react'

/******************************************************************************/
// Data
/******************************************************************************/

const VisibleRoute = withRouter(({
  location, match, history,
  exact, delay, path, strict,
  component: Component
}) => {

  const matches = !!matchPath(location.pathname, { exact, path, strict })

  return <Visible visible={matches} delay={delay}>
    <Component location={location} match={match} history={history} />
  </Visible>
})

/******************************************************************************/
// Main
/******************************************************************************/

const Routes = () => [
  <VisibleRoute key='home' path='/' exact delay={400} component={Home} />,
  <VisibleRoute key='about' path='/about' delay={400} component={About} />,
  <VisibleRoute key='videos' path='/videos' delay={400} component={Videos} />,
  <VisibleRoute key='vault' path='/vault' delay={400} component={Vault} />
]

/******************************************************************************/
// Exports
/******************************************************************************/

export default Routes
