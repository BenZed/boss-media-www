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

    </div>
    {children}
  </div>
}
