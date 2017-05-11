import React from 'react'
import Icon from './Icon'

//plug this regex into the find/replace to clean up svgs from editor.method.ac
//(id|class|fill|stroke)(-[a-z]+)?=('|')([A-z]|\d|_|-)+('|')\s?

export default function NodeTableView({...other}) {

  return <Icon {...other} viewWidth={100}>
    <rect height='26.68222' width='25.26937' y='0.05894' x='0.21183' />
    <rect height='26.68222' width='67.0514' y='0.05894' x='33.23715' />
    <rect height='26.68222' width='25.26937' y='36.08656' x='0.21183' />
    <rect height='26.68222' width='67.0514' y='36.08656' x='33.23715' />
    <rect height='26.68222' width='25.26937' y='73.36514' x='0.21183' />
    <rect height='26.68222' width='67.0514' y='73.36514' x='33.23715' />
  </Icon>
}
