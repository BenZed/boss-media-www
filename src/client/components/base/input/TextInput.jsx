import React from 'react'
import { Block } from '../layout'
import { Info } from '../display'

const TextInput = ({ classes, onChange, onFocus, onBlur, value, readOnly, type ,
   info, placeholder, ...rest }) => {

  const input = { onChange, onFocus, onBlur, value, readOnly, type, placeholder }

  return <Block classes={['textinput', classes]} { ...rest } >
    <Block component='input' {...input} />
    <Info>{info}</Info>
  </Block>
}

export default TextInput
