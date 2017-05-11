import React from 'react'
import { Block } from '../layout'
import { Info } from '../display'

const Slider = ({ classes, onChange, onFocus, onBlur, value,
     info, min, max, step, ...rest }) => {

  const input = { onChange, onFocus, onBlur, value, min, max, step }

  return <Block classes={['slider', classes]} { ...rest } >
    <Block component='input' type='range' {...input} />
    <Info>{info}</Info>
  </Block>
}

export default Slider
