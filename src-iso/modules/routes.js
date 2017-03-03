import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, About, HeadQuarters, Videos, Nerdy } from 'pages'

const Navigation = ({children, match, ...other}) => {
  console.log(match, children)
  return <div>
    { children }
  </div>
}

const routes = [
  {
    path: '/',
    component: Navigation,
    routes: [{
      path: '/about',
      component: Videos
    },{
      path: '/videos',
      component: About
    },{
      path: '/hq',
      component: HeadQuarters
    },{
      path: '/nerdy',
      component: Nerdy
    }]
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) =>
  <Route path={route.path} render={props =>
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  }/>



export default () =>
  <Router>
    <div>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
