import './index.html'
import 'normalize.css'
import './styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Navigation } from './components'
import { Main } from './pages'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

/******************************************************************************/
// Setup
/******************************************************************************/

window.onload = () => {

  const mainTag = document.getElementsByTagName('main')[0]
  ReactDOM.render(<Website/>, mainTag)

}

/******************************************************************************/
// Routes
/******************************************************************************/

function Website() {
  return <Router history={browserHistory} >
    <Route path='/' component={Navigation} >
      <IndexRoute component={Main} />
    </Route>
  </Router>
}
