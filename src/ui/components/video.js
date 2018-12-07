import React from 'react'
import styled from 'styled-components'

/******************************************************************************/
// Helper
/******************************************************************************/

const Player = styled(({ videoId, width, height, className }) =>
  <iframe
    className={className}
    frameBorder='0'
    scrolling='no'
    // width='788.54'
    // height='443'
    src={`https://www.youtube.com/embed/${videoId}` +
    `?autoplay=0` +
    `&iv_load_policy=3` +
    `&rel=0` +
    `&cc_load_policy=0` +
    `&start=0` +
    `&end=0`
}/>)`

  width: ${props => props.size * 16}vw;
  height: ${props => props.size * 9}vw;

`
Player.defaultProps = {
  size: 5
}

/******************************************************************************/
// Main Component
/******************************************************************************/

const Video = ({ children, video, ...props }) =>
  <div {...props}>
    { video
      ? <Player videoId={video.id}/>
      : null
    }
  </div>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Video
