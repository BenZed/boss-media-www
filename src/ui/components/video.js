import React from 'react'
import styled from 'styled-components'
import { $16x9 } from '../util'

import { Visible } from '@benzed/react'

import $ from '../theme'

/******************************************************************************/
// Helper
/******************************************************************************/

const Player = styled(({ videoId, autoplay, width, height, className, ...rest }) =>
  <iframe
    className={className}
    frameBorder='0'
    scrolling='no'
    {...rest}
    src={`https://www.youtube.com/embed/${videoId}` +
    `?autoplay=${autoplay ? 1 : 0}` +
    `&iv_load_policy=3` +
    `&rel=0` +
    `&cc_load_policy=0` +
    `&start=0` +
    `&end=0`}/>)`

  position: relative;

  width: 100%;
  height: 100%;

`

Player.defaultProps = {
  size: 1,
  units: 'em'
}

/******************************************************************************/
// Css Func
/******************************************************************************/

const coverDirectionToTranslate = props => {
  const magnitude = props.preloading
    ? 100
    : props.loaded
      ? -100
      : 0

  const dir = props.coverDirection

  let x = 0
  let y = 0
  if (!dir || dir === 'up')
    y = magnitude

  else if (dir === 'down')
    y = -magnitude

  else if (dir === 'left')
    x = -magnitude

  else if (dir === 'right')
    x = magnitude

  return `translate(${x}%, ${y}%)`

}

/******************************************************************************/
// Styles
/******************************************************************************/

const Description = styled.div`
  margin: 1em 0em 2em 0em;
`

const Cover = styled.div`

  width: 100%;
  height: 100%;

  transform: ${coverDirectionToTranslate};

  position: absolute;
  transition: transform 250ms;

  z-index: 1000;
  background-color: ${$.theme.primary};

`

const Container = styled.div`
  ${props => $16x9(props.size, props.units)}
  display: flex;
  position: absolute;
  overflow: hidden;
  transition: opacity 250ms, transform 250ms;

  iframe {
    opacity: ${props => props.visibility === 'shown' ? 1 : 0};
    transition: opacity 250ms;
  }
`

/******************************************************************************/
// Main Component
/******************************************************************************/

class Video extends React.Component {

  state = {
    loaded: false,
    videoId: null
  }

  componentDidMount () {
    const { video } = this.props

    this.setLoaded(video?.id)
  }

  componentDidUpdate (prev) {
    const { video } = this.props
    if (video?.id !== prev.video?.id)
      this.setLoaded(video?.id)
  }

  setLoaded (videoId) {
    if (videoId)
      this.setState({ videoId })

    setTimeout(() =>
      this.div && this.setState({ loaded: !!videoId })
    , 1000)
  }

  getRef = div => {
    this.div = div
  }

  render () {
    const { size, units, visibility, autoplay, coverDirection, ...rest } = this.props
    const { loaded, videoId } = this.state

    const showing = visibility === 'showing'
    const readyToPlay = videoId && loaded

    return <Container
      size={size}
      units={units}
      ref={this.getRef}
      visibility={visibility}
      {...rest}
    >
      <Cover
        preloading={showing}
        loaded={readyToPlay}
        coverDirection={coverDirection}
      />
      { videoId
        ? <Player videoId={videoId} autoplay={autoplay} />
        : null
      }
    </Container>

  }

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default Video::Visible.observe(false)
