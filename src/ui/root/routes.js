import React from 'react'
import { withRouter, matchPath } from 'react-router-dom'

import { Missing, Home, Playlist } from '../pages'

import { Visible } from '@benzed/react'
import { copy } from '@benzed/immutable'

import { urlify } from '../util'

/******************************************************************************/
// Helper
/******************************************************************************/

function toPath () {
  const title = this

  const path = `/${title::urlify()}/:videoNameOrId?`
  return path
}

/******************************************************************************/
// Data
/******************************************************************************/

const VisibleRoute = withRouter(({
  location, history, path,
  exact, delay, strict,
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

const Routes = ({ playlists, latest }) =>
  <>

    <VisibleRoute
      path='/'
      exact
      delay={500}
      component={Home}
      latest={latest}
    />

    {/* TODO add back in
    <VisibleRoute
    key='about'
    path='/about'
    delay={400}
    component={About}
    /> */}

    {playlists.map(playlist =>
      <VisibleRoute
        key={playlist.id}
        path={playlist.title::toPath()}
        delay={500}
        component={Playlist}
        playlist={playlist}
      />
    )}

    <VisibleRoute
      delay={500}
      path='/404'
      component={Missing}
    />
  </>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Routes
