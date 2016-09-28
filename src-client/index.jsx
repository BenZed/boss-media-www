import './index.html'
import 'normalize.css'
import './styles/main.scss'

import React from 'react'
import { render } from 'react-dom'
import { Navigation } from './components'
import { Main, Videos, BehindTheScenes, TheGang } from './pages'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

/******************************************************************************/
// Setup
/******************************************************************************/

window.onload = () => {

  const mainTag = document.getElementsByTagName('main')[0]
  render(<Website/>, mainTag)

}

/******************************************************************************/
// Routes
/******************************************************************************/

function Website() {
  return <Router history={browserHistory} >
    <Route path='/' component={Navigation} >
      <IndexRoute component={Main} />
      <Route path='/videos' component={Videos}/>
      <Route path='/behind-the-scenes' component={BehindTheScenes}/>
      <Route path='/the-gang' component={TheGang}/>
    </Route>
  </Router>
}
