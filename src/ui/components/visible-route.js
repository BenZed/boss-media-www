import React from 'react'
import { withRouter, matchPath } from 'react-router'
import { Visible } from '@benzed/react'

/******************************************************************************/
// Main Component
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
// Exports
/******************************************************************************/

export default VisibleRoute
