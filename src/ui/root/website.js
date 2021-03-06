import React from 'react'
import styled from 'styled-components'

import Navigation from './navigation'
import Routes from './routes'

import { GlobalStyle } from '@benzed/react'
import { first } from '@benzed/array'
import { copy, sort } from '@benzed/immutable'

import { theme } from '../theme'
import { NAV_PLAYLISTS } from '../constants'

import is from 'is-explicit'

/******************************************************************************/
// Helper
/******************************************************************************/

// TODO maybe move to @benzed/array?
function favourite (...args) {

  let arr
  let tests
  if (this !== undefined) {
    arr = this
    tests = args
  } else {
    arr = args.shift()
    tests = args
  }

  for (const test of tests)
    for (let i = 0; i < arr.length; i++)
      if (test(arr[i], i, arr))
        return arr[i]

  return first(arr)
}

const fix = title => title
  .replace(/^boss\shq\s-?/i, '')
  .trim()

const byPublishDate = (a, b) =>
  a.published > b.published
    ? -1
    : a.published < b.published
      ? 1
      : 0

const sanitizeVideos = videos => {

  const sanitized = []

  for (let video of videos) {
    video = video::copy()

    // TODO HQ should be it's own playlist, rather than parsing the video name.
    video.hq = /^boss\shq\s-?/i.test(video.title)
    video.title = fix(video.title)
    video.published = new Date(video.published)

    sanitized.push(video)
  }

  return sanitized
}

const sanitizePlaylists = playlists => playlists::copy()

const sortPlaylists = (videos, playlists) => {

  playlists = playlists::copy()

  for (const playlist of playlists)
    playlist.videos = playlist
      .videos
      .map(id => videos
        .filter(vid => vid.id === id)
        ::first()
      )
      .filter(is.defined)
      ::sort(byPublishDate)

  // TODO Remove when HQ is it's own playlist
  playlists.push({
    id: null,
    title: 'HQ',
    description: 'Behind the Scenes of Boss Media',
    videos: videos.filter(vid => vid.hq)
  })

  return playlists
}

const getLatest = (videos, playlists) => {

  const video = videos.length > 1
    ? videos.reduce((a, b) =>
      a.published > b.published
        ? a
        : b)
    : videos[0]

  const playlist = video && playlists
    .filter(playlist => playlist
      .videos
      .some(v => v.id === video.id)
    )
    // if a video belonds to multiple playlists, favour a playlist that's already
    // linked on the nav
    ::favourite(p => NAV_PLAYLISTS.includes(p.title))

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

const Website = ({ videos, playlists, images = {}, ...props }) => {

  const sanitizedVideos = sanitizeVideos(videos)

  const sanitizedPlaylists = sanitizePlaylists(playlists)

  const sortedPlaylists = sortPlaylists(sanitizedVideos, sanitizedPlaylists)
  const latest = getLatest(sanitizedVideos, sortedPlaylists)

  return <GlobalStyle theme={theme}>

    <WebsiteLayout image={images.black}>

      <Routes playlists={sortedPlaylists} latest={latest} />
      <Navigation images={images} />

    </WebsiteLayout>

  </GlobalStyle>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default Website
