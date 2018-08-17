import React from 'react'
import styled from 'styled-components'

import LayerManager from '../layer-manager'
import Navigation from './navigation'
import Routes from './routes'

import { GlobalStyle } from '@benzed/react'

import { theme } from '../theme'

/******************************************************************************/
// Main
/******************************************************************************/

const Website = () =>
  <GlobalStyle theme={theme}>
    <LayerManager>
      <Routes />
      <Navigation />
    </LayerManager>
  </GlobalStyle>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Website
