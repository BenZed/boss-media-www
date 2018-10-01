import React from 'react'
import { Visible, observe } from '@benzed/react'

/******************************************************************************/
// Main Component
/******************************************************************************/

class Page extends React.Component {

  setMask () {
    const { points, mask } = this.props
    if (points)
      mask.push(points)
  }

  componentDidMount () {
    if (this.props.visibility === 'shown')
      this.setMask()
  }

  componentDidUpdate (prev) {
    if (this.props.visibility.includes('show') && prev.visibility !== 'shown')
      this.setMask()
  }

  render () {
    return this.props.title
  }

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default Page::observe('mask')::Visible.observe()
