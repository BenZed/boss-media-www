import { Link } from 'react-router'
import Background from './Background'

export default function({children}) {
  return <div>
    <div id='navigation'>
      <Link to='/the-gang' className='right'>The Gang</Link>
      <Link to='/behind-the-scenes' className='right'>HQ</Link>
      <Link to='/videos' className='right'>Videos</Link>
      <Link to='/' className='left'><h6>Boss Media</h6></Link>
    </div>
    <div id='page-control'>
      {children}
    </div>
    {/* <Background/> */}
  </div>
}
