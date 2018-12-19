import styled from 'styled-components'

import React from 'react'
import Page from './Page'

import { Video } from '../components'

import { Visible, Slide, Flex } from '@benzed/react'
import { adjacent } from '@benzed/array'

import $ from '../theme'

/******************************************************************************/
// Css Funcs
/******************************************************************************/

const titleStageTransform = mirrored => {

  return props => {
    let x = 0
    let y = 0

    if (props.stage === 'opened')
      x = -5

    const up = props.stage === 'title-up' || props.stage === 'show-movie'

    if (up)
      y = `calc(-50vh + 0.5em)`
    else
      y = `${y}em`

    if (mirrored)
      x *= -1

    x = `${x}em`

    return `translate(${x}, ${y})`
  }
}

/******************************************************************************/
// Helper Components
/******************************************************************************/

const STAGES = [ 'opened', 'title-in', 'title-up', 'show-movie', null ]

class HomeAnimation extends React.Component {

  state = {
    stage: STAGES[0]
  }

  componentDidMount () {
    this.advanceStage()
  }

  advanceStage () {

    const nextStage = STAGES::adjacent(this.state.stage)
    const time = nextStage === 'title-in' ? 250 : 500

    if (nextStage)
      setTimeout(() => this.setState({ stage: nextStage }), time)
  }

  componentDidUpdate (prevProps, prevState) {

    if (prevState.stage !== this.state.stage)
      this.advanceStage()
  }

  render () {
    const { latestVideo } = this.props

    const { stage } = this.state

    return <Flex.Column key='column' items='center' justify='center' grow={1} style={{ zIndex: 1000 }}>

      <Visible visible={stage === 'show-movie'}>

        <Slide from='left' to='right'>

          <Video
            video={latestVideo}
            size={2}
            units='em'
            autoplay
            coverDirection='right'
          />

        </Slide>

      </Visible>

    </Flex.Column>
  }

}

/******************************************************************************/
// Main
/******************************************************************************/

const HomePage = props =>
  <Page>
    <HomeAnimation {...props} />
  </Page>

/******************************************************************************/
// Exports
/******************************************************************************/

export default HomePage::Visible.observe(true)
