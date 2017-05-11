import './polyfill'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

const Website = () =>
  <h1>Boss media WWW</h1>

/******************************************************************************/
// Setup
/******************************************************************************/

window.onload = () => {
  const mainTag = document.getElementsByTagName('main')[0]
  render(<Website/>, mainTag)
}
