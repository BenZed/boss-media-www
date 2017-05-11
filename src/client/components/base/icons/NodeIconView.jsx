import React from 'react'
import Icon from './Icon'

//plug this regex into the find/replace to clean up svgs from editor.method.ac
//(id|class|fill|stroke)(-[a-z]+)?=("|')(#|\.|[A-z]|\d|_|-)+("|')\s?

export default function NodeIconView({...other}) {

  return <Icon {...other} viewWidth={100}>
    <rect height='28.43356' width='28.77206' y='0.05894' x='0.21183' />
    <rect height='28.43356' width='28.77206' y='-0.19125' x='35.23868' />
    <rect height='28.43356' width='28.77206' y='-0.19125' x='71.01611' />
    <rect height='28.43356' width='28.77206' y='35.58617' x='0.21183' />
    <rect height='28.43356' width='28.77206' y='35.33598' x='35.48887' />
    <rect height='28.43356' width='28.77206' y='35.33598' x='71.2663' />
    <rect height='28.43356' width='28.77206' y='71.86398' x='0.21183' />
    <rect height='28.43356' width='28.77206' y='71.61379' x='35.48887' />
    <rect height='28.43356' width='28.77206' y='71.61379' x='71.01611' />
  </Icon>
}
