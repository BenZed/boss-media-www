import './polyfill'
import 'normalize.css'
import 'styles/index.scss'

import React from 'react'
import { render } from 'react-dom'

import Page from 'modules/routes'

/******************************************************************************/
// Setup
/******************************************************************************/

window.onload = () => {
  const mainTag = document.getElementsByTagName('main')[0]
  render(<Page/>, mainTag)
}
