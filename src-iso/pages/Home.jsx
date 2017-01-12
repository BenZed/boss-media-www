import React from 'react'

function BossLogo() {
  return <div id='boss-media-logo'>
    <h1 id='boss-title'>BOSS</h1><h1 id='media-title'>MEDIA</h1>
  </div>
}

export default function Home({children}) {
  return <div>
    <BossLogo/>
    {children}
  </div>
}
