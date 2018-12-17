import React from 'react'
import styled from 'styled-components'
import Page from './Page'

import { Video } from '../components'

import { first } from '@benzed/array'
import { Flex, Modal, Slide, Fade, isMobile, Visible } from '@benzed/react'

import { Link } from 'react-router-dom'

import { dashify, media, $16x9 } from '../util'
import $ from '../theme'

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

function navigateTo (base) {

  const history = this

  return e => {
    e.stopPropagation()
    history.push(`/${base}`)
  }

}

/******************************************************************************/
// Move Me, this component will be reused TODO
/******************************************************************************/

const Title = styled.h4`

  background-color: ${$.theme.bg.fade(0.5)};
  padding: 0.4em;

  ${media.tablet.css`
    font-size: 85%;
  `}

  ${media.phone.css`
    font-size: 75%;
  `}

`

const VideoLink = styled(({ prefix, video, ...rest }) =>

  <Flex.Column items='center' {...rest}>

    <Link
      to={`/${prefix}/${dashify(video.title)}`}
      style={{
        backgroundImage: `url(${video.thumbnails.medium.url})`
      }}
    >
      <Title >{video.title}</Title>
    </Link>

  </Flex.Column>

)`
  margin: 0.25em;

  > a {
    ${$16x9(1.25)}
    text-decoration: none;
    background-size: cover;
    background-position: center;
  }

`

/******************************************************************************/
// Main
/******************************************************************************/

const PlaylistPage = ({ playlist, match, location, history, ...props }) => {

  const { videoNameOrId = null } = match?.params || {}

  const video = playlist::findVideo(videoNameOrId)

  const base = dashify(playlist.title)
  const goBack = video
    ? history::navigateTo(base)
    : null

  return <Page title={playlist.title} >
    { !isMobile()
      ? <Visible visible={!!video}>

        <Modal
          visible={!!video}
          position='fixed'
          onClick={goBack}>

          <Fade>
            <Video video={video} size={2.25}/>
          </Fade>

        </Modal>

      </Visible>
      : null
    }

    <Flex.Column items='center'>
      {match && playlist?.videos.map(v =>
        isMobile() && video && v.id === video.id
          ? <Video
            key={v.id}
            size={1.25}
            units='em'
            video={v}
          />

          : <VideoLink
            key={v.id}
            prefix={base}
            video={v}
          />
      )}
    </Flex.Column>

  </Page>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default PlaylistPage
