import React from 'react'
import { Link } from 'react-router'

export default function Navigation({children}) {
  return <div>
    <Link to='/about'>About</Link>
    <Link to='/videos'>Videos</Link>
    <Link to='/hq'>Behind The Scenes</Link>
    {children}
  </div>
}
