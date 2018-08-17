import React from 'react'
import styled from 'styled-components'

import $ from '../theme'

const TIME = 400

/******************************************************************************/
// Helper
/******************************************************************************/

function vectorToScreen (vector) {
  return `${vector.x}vw ${vector.y}vh`
}

/******************************************************************************/
// Main
/******************************************************************************/

const Layer = styled.div.attrs({
  style: props => {

    const { clip } = props

    return clip
      ? {
        clipPath: `polygon(${
          clip.map(vectorToScreen).join(', ')
        })`
      }
      : null

  }
})`

  width: 100vw;
  height: 100vh;

  z-index: ${$.prop('z')};
  transition: clip-path ${TIME}ms;
  position: absolute;

`

/******************************************************************************/
// Exports
/******************************************************************************/

export default Layer
