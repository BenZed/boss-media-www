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

const sanitizeVideos = videos => {

  const sanitized = []

  for (const video of videos)
    sanitized.push(video::copy(video => {
      video.title = fix(video.title)
      video.published = new Date(video.published)
    }))

  return sanitized
}

const sanitizePlaylists = playlists => playlists::copy()

const sortPlaylists = (videos, playlists) => {

  playlists = playlists::copy()

  for (const video of videos) {
    video.title = fix(video.title)
    video.published = new Date(video.published)
  }

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

// const getLatest = videos =>

const getLatest = (videos, playlists) => {

  const video = videos.reduce((a, b) =>
    a.published > b.published
      ? a
      : b
  )

  const playlist = video && playlists
    .filter(playlist => playlist
      .videos
      .some(v => v.id === video.id)
    )
    ::first()

  return {
    video, playlist
  }
}
/******************************************************************************/
// Styles
/******************************************************************************/

const WebsiteLayout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-image: url(${props => props.image});
  background-position: center center;
  background-size: cover;
`

/******************************************************************************/
// Main
/******************************************************************************/

const Website = ({ videos, playlists, black, orange, ...props }) => {

  const sanitizedVideos = sanitizeVideos(videos)
  const sanitizedPlaylists = sanitizePlaylists(playlists)

  const sortedPlaylists = sortPlaylists(sanitizedVideos, sanitizedPlaylists)
  const latest = getLatest(sanitizedVideos, sortedPlaylists)

  return <GlobalStyle theme={theme}>

    <WebsiteLayout image={black}>

      <Routes playlists={sortedPlaylists} latest={latest} />
      <Navigation image={orange} />

    </WebsiteLayout>

  </GlobalStyle>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default Website
