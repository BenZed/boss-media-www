import React from 'react'
import Block from './Block'
import { Button } from '../input'
import Icons from '../icons'

const Popover = ({open, shaded, padded, onToggle, brand, classes, children, icon, ...rest}) =>
  <Block classes={['popover', { 'popover-open': open }, classes]} brand={brand} {...rest}>

    <Button shaded round brand={brand || (open ?  'neutral' : null)} onClick={onToggle}
      classes='popover-button' >
      { icon || <Icons.Caret/> }
    </Button>

    <Block shaded={shaded} padded={padded} show={open} time classes='popover-container'>
      {children}
    </Block>

  </Block>


class Auto extends React.Component {

  state = { open: false }

  toggle = () =>
    this.setState({ open: !this.state.open })

  render = () =>
    <Popover open={this.state.open} onToggle={this.toggle} {...this.props} />
}

Popover.Auto = Auto

Popover.defaultProps = {
  shaded: true
}

export default Popover
