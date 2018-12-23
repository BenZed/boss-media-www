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
    font-family: monospace;
    margin: 0em 1em 0em 0em;
  }

  a {
    font-size: 1.5;
    color: ${$.theme.bg};
    position: relative;
  }

  padding: 1em;

  background-color: ${$.theme.primary.fade(0.25)};
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
  <Slide from='top' to='bottom' >
    <Missing>
      <Container>
        <Flex.Row items='baseline' >
          <p>You are lost. See our <Link to='/'>Latest Video</Link>!</p>
        </Flex.Row>
      </Container>
    </Missing>
  </Slide>

/******************************************************************************/
// Exports
/******************************************************************************/

export default MissingPage

export {
  Container as MissingContainer
}
