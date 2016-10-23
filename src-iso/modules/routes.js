import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Navigation, Home, About } from 'pages'

export default <Route path='/' component={Navigation}>
    <IndexRoute component={Home}/>
    <Route path='/about' component={About}/>
  </Route>
