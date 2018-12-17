import React from 'react'
import styled from 'styled-components'
import { $16x9 } from '../util'

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
    `&end=0`}/>)`

  ${props => $16x9(props.size, props.units)}

  margin: 0.25em;

`

Player.defaultProps = {
  size: 1,
  units: 'em'
}

/******************************************************************************/
// Styles
/******************************************************************************/

const Description = styled.div`
  margin: 1em 0em 2em 0em;
`

/******************************************************************************/
// Main Component
/******************************************************************************/

const Video = ({ children, video, size, units }) =>
  <>
    { video
      ? <Player videoId={video.id} size={size} units={units}/>
      : null
    }
    { video
      ? <Description >{video.description}</Description>
      : null
    }
    {children}
  </>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Video
