import React from 'react'
import styled from 'styled-components'

import { observe } from '@benzed/react'
import { withRouter } from 'react-router'
import { $ } from '../theme'

/******************************************************************************/
// Data
/******************************************************************************/

const TIME = 500 // ms

/******************************************************************************/
//
/******************************************************************************/

const Title = styled.h1`
  font-size: 10vw;
  transform: scale(1, 1.1);
  letter-spacing: -0.07em;
  position: relative;
  left: 0.155em;

  transition: transform ${TIME}ms;

  color: ${$
    .prop('fore')
    .mut((v, p) => v
      ? p.theme.bg
      : p.theme.fg)
    .mut(String)};

  background-color: ${$
    .prop('fore')
    .mut((v, p) => v
      ? p.theme.primary
      : 'transparent'
    )
    .mut(v => String(v))};
`

/******************************************************************************/
// Main Component
/******************************************************************************/

const Navigation = ({ children, location, layers, ...props }) =>
  <Title>{layers.test}</Title>

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Navigation)::observe('layers')
