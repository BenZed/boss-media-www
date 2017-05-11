import React from 'react'
import Block from './Block'

const Panel = ({classes, children, ...rest}) =>
  <Block classes={['panel', classes]} {...rest}>
    {children}
  </Block>

export default Panel
