import React from 'react'
import styled from 'styled-components'

import Navigation from './navigation'
import Routes from './routes'
import { GlobalStyle } from '@benzed/react'
import { pluck, first } from '@benzed/array'
import { copy } from '@benzed/immutable'

import { theme } from '../theme'

import is from 'is-explicit'

/******************************************************************************/
// Helper
/******************************************************************************/

const fix = title => title
  .replace(/^boss\shq\s-?/i, '')
  .trim()

const sort = props => {

  const playlists = props.playlists::copy()
  const videos = props.videos::copy()

  for (const video of videos)
    video.title = fix(video.title)

  for (const playlist of playlists)
    playlist.videos = playlist
      .videos
      .map(id => videos
        ::pluck(vid => vid.id === id, 1)
        ::first()
      )
      .filter(is.defined)

  if (videos.length > 0)
    playlists.push({
      id: null,
      title: 'HQ',
      description: 'Behind the Scenes of Boss Media',
      videos
    })

  return playlists
}

/******************************************************************************/
// Styles
/******************************************************************************/

const WebsiteLayout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`

/******************************************************************************/
// Main
/******************************************************************************/

const Website = props => {

  const playlists = sort(props)

  return <GlobalStyle theme={theme}>
    <WebsiteLayout>
      <Routes playlists={playlists} />
      <Navigation />
    </WebsiteLayout>
  </GlobalStyle>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default Website
