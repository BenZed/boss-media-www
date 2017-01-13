import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

function NavigationLink({to, children}) {
  return <Link className='block right' to={to}>
    {children}
  </Link>
}

export default function Navigation({children, location }) {

  const atHome = location.pathname === '/'

  const classes = classNames({
    'splash': atHome
  })

  return <div id='container' className={classes}>

    <h1 id='boss'>Boss</h1>
    <h1 id='media'>Media</h1>

    <div id='navigation' className={'flex column'}>

      <NavigationLink to={'/'}>Home</NavigationLink>
      <NavigationLink to={'/about'}>Videos</NavigationLink>
      <NavigationLink to={'/hq'}>Behind The Scenes</NavigationLink>

    </div>

    {children}
  </div>
}
