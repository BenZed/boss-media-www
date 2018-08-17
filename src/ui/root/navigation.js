import React from 'react'
import styled from 'styled-components'

import { Visible } from '@benzed/react'

import { withRouter, matchPath } from 'react-router'
import { NavLink } from 'react-router-dom'

import { $ } from '../theme'

import { LayerPortal } from '../layer-manager'

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

  width: 100%;
  height: 100%;

  transition: transform ${TIME}ms;

  color: ${$.prop('fore')
    .mut((v, p) => v ? p.theme.bg : p.theme.fg)
    .mut(v => String(v))};

  background-color: ${$.prop('fore')
    .mut((v, p) => v ? p.theme.primary : 'transparent')
    .mut(v => String(v))};
`

/******************************************************************************/
// Main Component
/******************************************************************************/

const Navigation = ({ children, location, ...props }) => {

  const isAtHome = !!matchPath(location.pathname, { path: '/', exact: true })

  return <LayerPortal key='light'>
    <Title>BOSS MEDIA</Title>
  </LayerPortal>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Navigation)
