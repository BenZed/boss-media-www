import React from 'react'
import styled from 'styled-components'
import Page from './Page'

import { Video } from '../components'

import { first } from '@benzed/array'
import { Scroll } from '@benzed/react'


import { Link } from 'react-router-dom'

/******************************************************************************/
// Helper
/******************************************************************************/

const toUrl = str => str && str.toLowerCase().replace(/\s/g, '-').replace(/-+/g, '-')

function findVideo (nameOrId) {

  const playlist = this
  const { videos } = playlist

  const video = nameOrId && videos
    .filter(v => v.id === nameOrId || toUrl(v.title) === nameOrId)
    ::first()

  return video || null

}

/******************************************************************************/
// Main
/******************************************************************************/

const PlaylistPage = ({ playlist, match, location, ...props }) => {

  const { videoNameOrId = null } = match?.params || {}

  const video = playlist::findVideo(videoNameOrId)

  const base = videoNameOrId
    ? match.url.replace(videoNameOrId, '')
    : match?.url + '/'

  console.log(video)

  return <Page title={playlist.title} >
    {video
      ? <React.Fragment>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
        <img src={video.thumbnails.standard.url} />
        <br/>
      </React.Fragment>
      : null
    }
    {match && playlist?.videos.map(video =>
      <React.Fragment key={video.id}>
        <Link to={`${base}${toUrl(video.title)}`}>
          <img src={video.thumbnails.default.url} />
        </Link>
        <br/>
      </React.Fragment>
    )}
  </Page>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default PlaylistPage
