import React from 'react'
import styled from 'styled-components'
import Page from './Page'

import { Link } from 'react-router-dom'

import { Slide, Flex } from '@benzed/react'

import $ from '../theme'

/******************************************************************************/
// Styles
/******************************************************************************/

const Container = styled.div`

  p {
    font-size: 2em;
    margin: 0em 0em 1em 0em;
  }

  a {
    color: ${$.theme.primary};
    z-index: 1000;
    position: relative;
  }

  padding: 1em;

  background-color: ${$.theme.bg.fade(0.5)};
  width: 100%;

  display: flex;
  align-items: center;


`

const Missing = styled(Page)`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`

/******************************************************************************/
// Main
/******************************************************************************/

const MissingPage = props =>
  <Slide from='bottom' to='left' >
    <Missing>
      <Container>
        <Flex.Column>
          <p>You must be lost!</p>
          <Link to='/'>Latest</Link>
        </Flex.Column>
      </Container>
    </Missing>
  </Slide>

/******************************************************************************/
// Exports
/******************************************************************************/

export default MissingPage
