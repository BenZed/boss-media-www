import React from 'react'
import Block from '../layout/Block'

export default function Icon({label, children, spin, viewWidth, classes, ...other}) {

  const icon = <Block classes={[{ 'icon-spin': spin }, 'icon', classes]} component='svg' {...other}
      viewBox={`0 0 ${viewWidth} 100`}
    >
    {children}
  </Block>

  return label
    ? <span>{icon}{label}</span>
    : icon
}

Icon.defaultProps = {
  viewWidth: 115
}
