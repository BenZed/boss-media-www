import React from 'react'
import styled from 'styled-components'
import Page from './Page'

import { Video } from '../components'

import { first } from '@benzed/array'
import { Flex, Modal, Visible, Fade, Slide } from '@benzed/react'

import { Link } from 'react-router-dom'

import { dashify } from '../util'

/******************************************************************************/
// Helper
/******************************************************************************/

function findVideo (nameOrId) {

  const playlist = this
  const { videos } = playlist

  const video = nameOrId && videos
    .filter(v => v.id === nameOrId || dashify(v.title) === nameOrId)
    ::first()

  return video || null

}

/******************************************************************************/
// Main
/******************************************************************************/

const PlaylistPage = ({ playlist, match, location, history, ...props }) => {

  const { videoNameOrId = null } = match?.params || {}

  const video = playlist::findVideo(videoNameOrId)

  const base = dashify(playlist.title)

  return <Page title={playlist.title} >
    { match
      ? <Modal
        visible={!!video}
        position='fixed'
        onClick={video
          ? e => {
            e.stopPropagation()
            history.push(`/${base}`)
          } : null
        }>
        <Slide from='top'>
          <Flex.Column>
            <h2>{video?.title}</h2>
            <p>{video?.description}</p>
            {
              video
                ? <img src={video.thumbnails.standard.url} />
                : null
            }
            <br/>
          </Flex.Column>
        </Slide>
      </Modal>
      : null}
    <Flex.Row wrapped>
      {match && playlist?.videos.map(video =>
        <React.Fragment key={video.id}>
          <Link to={`/${base}/${dashify(video.title)}`}>
            <img src={video.thumbnails.medium.url} />
          </Link>
          <br/>
        </React.Fragment>
      )}
    </Flex.Row>
  </Page>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default PlaylistPage
