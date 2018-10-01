// import React from 'react'
import styled from 'styled-components'
import { observe } from '@benzed/react'

import $ from '../theme'

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

    const { clipped, mask } = props

    return clipped
      ? {
        clipPath: `polygon(${
          mask
            .vectors
            .map(vectorToScreen)
            .join(', ')
        })`
      }
      : null
  }
})`

  width: 100vw;
  height: 100vh;

  z-index: ${$.prop('z')};
  transition: clip-path ${$.theme.time}ms;
  position: absolute;

`

/******************************************************************************/
// Exports
/******************************************************************************/

export default Layer::observe('mask')
