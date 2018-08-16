import React from 'react'
import styled from 'styled-components'

import { Slide, Fade } from '@benzed/react'

/******************************************************************************/
//
/******************************************************************************/

const Title = styled.div`
  display: flex;
  width: 100%;
  font-size: 2em;
`

const Layout = styled.div`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  bottom: 0.5em;
  right: 6.5em;
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
