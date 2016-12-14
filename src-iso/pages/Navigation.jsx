import React from 'react'
import { Link } from 'react-router'

function NavigationLink({to, children}) {
  return <Link className='padded inline block right' to={to}>
    <h3>{children}</h3>
  </Link>
}

export default function Navigation({children}) {
  return <div>
    <div id='navigation'>
      <NavigationLink to='/hq'>Behind The Scenes</NavigationLink>
      <NavigationLink to='/videos'>Videos</NavigationLink>
      <NavigationLink to='/about'>About</NavigationLink>
    </div>
    {children}
  </div>
}
