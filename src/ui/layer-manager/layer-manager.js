import React from 'react'

import Layer from './layer'

import { FORE_LAYER_ID, BACK_LAYER_ID } from './layer-portal'

import { Vector } from '@benzed/math'

// 'polygon(70vw 0vh, 100vw 100vh, 20vw 100vh, 50vw 0vh)'
/******************************************************************************/
// Main Component
/******************************************************************************/

class LayerManager extends React.Component {

  state = {
    points: [
      new Vector(70, 0),
      new Vector(100, 100),
      new Vector(20, 100),
      new Vector(50, 0)
    ]
  }

  componentDidMount () {
    setTimeout(() => {
      const points = [
        new Vector(50, -20),
        new Vector(100, 50),
        new Vector(50, 120),
        new Vector(0, 50)
      ]
      this.setState({ points })
    }, 500)
  }

  render () {
    const { children } = this.props
    const { points } = this.state

    return [

      <Layer key='fore'
        id={FORE_LAYER_ID}
        z={100}
        clip={points}
      />,

      children,

      <Layer key='back'
        id={BACK_LAYER_ID}
        z={-1}
      />

    ]
  }

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default LayerManager
