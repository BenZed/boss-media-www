import React from 'react'
import styled from 'styled-components'

import { Layer, Mask } from '../layer'

// import Navigation from './navigation'

import { VisibleRoute } from '../components'
import { GlobalStyle, StoreProvider } from '@benzed/react'

import { $, theme } from '../theme'

import { Home, Vault, Videos, About } from '../pages'

import { NavLink } from 'react-router-dom'

/******************************************************************************/
//
/******************************************************************************/

const PrimaryLayer = styled(Layer).attrs({
  z: $.theme.baseZ.valueOf(),
  clipped: true
})`
  background-color: ${$.theme.primary};
`

/******************************************************************************/
// Main
/******************************************************************************/

class Website extends React.Component {

  mask = new Mask()

  render () {

    const { mask } = this

    return <StoreProvider mask={mask}>

      <GlobalStyle theme={theme}>

        <PrimaryLayer>
          <NavLink to='/'>home</NavLink>
          <NavLink to='/about'>about</NavLink>
        </PrimaryLayer>

        <VisibleRoute path='/' exact component={Home} />
        <VisibleRoute path='/about' component={About} />
        {/*
        <VisibleRoute path='/videos' component={Videos} />
        <VisibleRoute path='/vault' component={Vault} />
        */}

      </GlobalStyle>

    </StoreProvider>
  }
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default Website
