import React from 'react'
import Icon from './Icon'

//plug this regex into the find/replace to clean up svgs from editor.method.ac
//(id|class|fill|stroke)(-[a-z]+)?=('|')([A-z]|\d|_|-)+('|')\s?

export default function Plus({...other}) {

  return <Icon {...other} viewWidth={100}>
    <rect height='99.82653' width='30.2732' y='0.05894' x='35.11359' />
    <rect height='28.77206' width='100.07672' y='34.8356' x='0.08674' />
  </Icon>
}
