import React from 'react'
import { bool, func } from 'prop-types'
import { Block } from '../layout'
import { Info } from '../display'

const Switch = ({classes, shadow, info, icon, active, left, onToggle, children, ...rest}) =>

  <Block classes={['switch', { 'switch-on': active, 'switch-label-left': left }, classes]} {...rest} >
    <Block classes='switch-container'>
      { left ? children : null }
      <Block classes='switch-node' shadow={shadow} inline onClick={onToggle ? () => onToggle(!active) : null} >{icon}</Block>
      { !left ? children : null }
    </Block>
    <Info>{info}</Info>
  </Block>

Switch.propTypes = {
  active: bool,
  left: bool,
  onToggle: func
}


export default Switch
