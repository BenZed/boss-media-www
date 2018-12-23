import React from 'react'
import { withRouter, matchPath } from 'react-router-dom'

import { Missing, Home, Playlist } from '../pages'

import { Visible } from '@benzed/react'
import { copy } from '@benzed/immutable'

import { urlify } from '../util'

/******************************************************************************/
// Data
/******************************************************************************/

const DELAY = 500

/******************************************************************************/
// Helper
/******************************************************************************/

function toPath () {
  const title = this

  const path = `/${title::urlify()}/:videoNameOrId?`
  return path
}

/******************************************************************************/
// Main
/******************************************************************************/

const Switch = ({ location, playlists, latest, history }) => {
  const routes = playlists.reduce((rs, playlist) => [
    ...rs,
    {
      path: playlist.title::toPath(),
      component: Playlist,
      playlist
    }
  ], [
    {
      path: '/',
      component: Home,
      latest,
      exact: true
    }
  ])

  let matchFound = false

  const elements = routes.map(({ exact, strict, path, component, ...rest }) => {

    const match = matchFound
      ? null
      : matchPath(
        location.pathname,
        { exact, path, strict }
      )::copy()

    if (match)
      matchFound = true

    const Component = component

    return <Visible visible={!!match} delay={DELAY} key={path}>
      <Component location={location} history={history} {...rest} match={match}/>
    </Visible>
  })

  return [
    ...elements,
    <Visible visible={!matchFound} delay={DELAY} key={null}>
      <Missing />
    </Visible>
  ]

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Switch)
