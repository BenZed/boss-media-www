import React from 'react'
import { bool, string } from 'prop-types'
import { Block } from '../layout'
import { Info } from '../display'

const Button = ({classes, info, round, padded, children, form, onClick, ...rest}) =>

  <Block classes={[ 'button', classes, { 'button-round': round } ]}
     padded={round ? true : padded} {...rest} >

    <Block component='button' type={form ? 'submit' : 'button'} form={form}
      onClick={onClick}>{children}
    </Block>
    <Info>{info}</Info>

  </Block>


Button.propTypes = {
  round: bool,
  info: string
}

export default Button
