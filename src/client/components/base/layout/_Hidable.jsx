import { createElement, Component } from 'react'
import { number, bool, oneOfType, string, func } from 'prop-types'

export default class Hideable extends Component {

  static propTypes = {
    time: number.isRequired,
    hidden: bool.isRequired,
    component: oneOfType([string, func])
  }

  state = {
    stage: 'hidden'
  }

  componentDidUpdate() {

    const { hidden } = this.props
    const { stage } = this.state

    this.nextStage = null

    if (hidden && stage !== 'hidden')
      this.nextStage = stage === 'hiding' ? 'hidden' : 'hiding'

    else if (!hidden && stage !== 'shown')
      this.nextStage = stage === 'showing' ? 'shown' : 'showing'

    if (this.nextStage && !is(this.timer, Number))
      this.timer = setTimeout(this.setStage, this.props.time)

  }

  setStage = () => {

    this.timer = null
    if (!this.mounted || !this.nextStage)
      return

    this.setState({ stage: this.nextStage })

  }

  componentDidMount() {
    this.mounted = true

    if (!this.props.hidden)
      this.setState({ stage: 'showing' })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render = () => {

    const { stage } = this.state
    const { hidden } = this.props

    if (hidden && stage === 'hidden')
      return null

    const { children, component, dom, ...rest } = this.props

    delete rest.time
    delete rest.hidden

    if (stage && stage !== 'shown')
      rest.className = is(rest.className, String)
        ? rest.className + ' ' + stage
        : stage

    rest.ref = rest.ref || dom

    return createElement(component, rest, children)
  }

}
