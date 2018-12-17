import React from 'react'
import styled from 'styled-components'

import { Slide, Fade } from '@benzed/react'

import { NAV_MARGIN } from '../constants'
/******************************************************************************/
//
/******************************************************************************/

const Title = styled.div`
  display: flex;
  width: 100%;
  font-size: 2em;
  position: sticky;
  top: 0.25em;
`

const Layout = styled.div`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  bottom: 0.5em;
  right: ${NAV_MARGIN}em;
`

/******************************************************************************/
// Main Component
/******************************************************************************/

const Page = ({ children, title, path, exact, strict, delay, ...props }) =>
  <Fade>
    <Layout {...props}>
      { title
        ? <Slide from='top'>
          <Title>{title}</Title>
        </Slide>
        : null
      }
      {children}
    </Layout>
  </Fade>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Page
