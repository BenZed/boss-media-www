import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Navigation, Home, About, HQ, Videos } from 'pages'

export default <Route path='/' component={Navigation}>
    <IndexRoute component={Home}/>
    <Route path='/about' component={About}/>
    <Route path='/videos' component={Videos}/>
    <Route path='/hq' component={HQ}/>
  </Route>
