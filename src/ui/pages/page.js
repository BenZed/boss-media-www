import React from 'react'
import styled from 'styled-components'

/******************************************************************************/
// Style
/******************************************************************************/

const Layout = styled.div`
  display: flex;
  position: fixed;
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
  <Layout {...props}>
    {children}
  </Layout>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Page
