import React from 'react'
import styled from 'styled-components'

import Navigation from './navigation'
import Routes from './routes'

/******************************************************************************/
// Styles
/******************************************************************************/

const WebsiteLayout = styled.div`
  display: flex;
  flex-direction: column;
`

/******************************************************************************/
// Main
/******************************************************************************/

const Website = ({ children }) =>
  <WebsiteLayout>
    <Navigation />
    <Routes />
    {children}
  </WebsiteLayout>

/******************************************************************************/
// Exports
/******************************************************************************/

export default Website
