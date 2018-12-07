import React from 'react'
import { withRouter, matchPath } from 'react-router-dom'

import { Home, About, Playlist } from '../pages'

import { Visible } from '@benzed/react'
import { copy } from '@benzed/immutable'

import { dashify } from '../util'

/******************************************************************************/
// Helper
/******************************************************************************/

function toPath () {
  const title = this

  const path = `/${title::dashify()}/:videoNameOrId?`
  return path
}

/******************************************************************************/
// Data
/******************************************************************************/

const VisibleRoute = withRouter(({
  location, history,
  exact, delay, path, strict,
  component: Component,
  ...rest
}) => {

  const match = matchPath(
    location.pathname,
    { exact, path, strict }
  )::copy()

  return <Visible visible={!!match} delay={delay}>
    <Component location={location} history={history} {...rest} match={match}/>
  </Visible>
})

/******************************************************************************/
// Main
/******************************************************************************/

const Routes = ({ playlists }) => [
  <VisibleRoute
    key='home'
    path='/'
    exact
    delay={400}
    component={Home}
  />,

  <VisibleRoute
    key='about'
    path='/about'
    delay={400}
    component={About}
  />,

  ...playlists.map(playlist =>
    <VisibleRoute
      key={playlist.id}
      path={playlist.title::toPath()}
      delay={400}
      component={Playlist}

      playlist={playlist}
    />
  )
]

/******************************************************************************/
// Exports
/******************************************************************************/

export default Routes
