import React from 'react'
import Icon from './Icon'

const POINTS = [
  'm57.660062','99.34861l-57.660143','-99.508585l114.999941','0'
]

export default function Caret({...other}) {

  return <Icon {...other}>
    <path d={POINTS}/>
  </Icon>

}
