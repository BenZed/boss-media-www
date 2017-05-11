import React from 'react'

import Panel from './Panel'
import Popover from './Popover'
import Block from './Block'
import Modal from './Modal'

/******************************************************************************/
// Convenience Layout Components
/******************************************************************************/

const Row = ({ flex, ...rest}) =>
  <Block flex={`row${ flex ? ` ${flex}` : ''}`} {...rest} />

const Column = ({ flex, ...rest}) =>
  <Block flex={`column${ flex ? ` ${flex}` : ''}`} {...rest} />

const Inline = props =>
  <Block inline {...props} />

export { Panel, Block, Inline, Modal, Row, Column, Popover }
