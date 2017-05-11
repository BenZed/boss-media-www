import { Component, createElement } from 'react'
import { oneOf, string } from 'prop-types'
import Hidable from './_Hidable'

const SHADES = Object.freeze(['light', 'dark', 'basic'])
export default class Shaded extends Component {

  static propTypes = {
    shaded: oneOf(SHADES)
  }

  static childContextTypes = {
    shaded: oneOf(SHADES).isRequired
  }

  static contextTypes = {
    shaded: string
  }

  getChildContext() {
    return {
      shaded: this.props.shaded || this.context.shaded || 'basic'
    }
  }

  render() {

    const { children, ...rest } = this.props

    const component = rest.time || rest.hidden ? Hidable : rest.component
    delete rest.shaded

    if (component !== Hidable)
      delete rest.component

    return createElement(component, rest, children)

  }
}
