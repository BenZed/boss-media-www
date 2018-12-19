import React from 'react'
import styled from 'styled-components'

import { Slide, Fade } from '@benzed/react'

import $ from '../theme'
import { media } from '../util'

/******************************************************************************/
//
/******************************************************************************/

const Layout = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`

/******************************************************************************/
// Main Component
/******************************************************************************/

const Page = ({ children, path, exact, strict, delay, ...props }) =>
  <Fade>
    <Layout {...props}>
      {children}
    </Layout>
  </Fade>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Page
