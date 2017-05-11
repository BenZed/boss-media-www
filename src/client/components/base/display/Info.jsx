import React from 'react'
import { Block } from '../layout'

const Info = ({children, show, ...rest}) =>
  <Block component='label' classes='info' show={show || !!children} {...rest} >
    {children}
  </Block>


export default Info
