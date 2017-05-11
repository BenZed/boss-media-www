import React from 'react'
import { func, bool, number } from 'prop-types'
import Block from './Block'

const stopPropThen = func => func
  ? e => e.stopPropagation() && func()
  : null

const Modal = ({classes, flex, children, fixed, show, hide, onClose, time, z, ...other}) => {

  const style = z ? { zIndex: z } : null

  return <Block padded classes={['modal', { 'modal-fixed': fixed }]}
    time={time} show={show} onClick={stopPropThen(onClose)} hide={hide} style={style}>

    <Block flex={flex} classes={['modal-children', classes]} {...other}>
      {children}
    </Block>

  </Block>
}

export default Modal

Modal.propTypes = {
  onClose: func,
  light: bool,
  dark: bool,
  z: number
}

Modal.defaultProps = {
  fixed: true,
  time: true
}
