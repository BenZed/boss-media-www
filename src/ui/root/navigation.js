import React from 'react'
import styled from 'styled-components'

import { Visible } from '@benzed/react'
import { adjacent, last, first } from '@benzed/array'

import { withRouter, matchPath } from 'react-router'
import { NavLink } from 'react-router-dom'

import { $ } from '../theme'
import is from 'is-explicit'
import { media } from '../util'

import { TIME } from '../constants'

/******************************************************************************/
// Data
/******************************************************************************/

const STAGES = [
  'page-load', 'transition-in', 'prepare', 'rest', 'transition-out'
]

const TRANSITSION_TIME = 500 // ms

/******************************************************************************/
// Helper
/******************************************************************************/

const getPage = location =>
  matchPath(location.pathname, { path: '/:page?' }).params.page || 'home'

/******************************************************************************/
// Styles
/******************************************************************************/

const Header = styled.h1`
  font-size: 10vw;
  transform: scale(1, 1.1);
  letter-spacing: -0.07em;
  display: inline;

  transition: transform ${TIME}ms;

  color: ${$.ifProp('bg').theme.bg.else.theme.fg};
`

const Container = styled.div`
  right: 0%;
  left: 50%;
  bottom: 0%;
  top: 0%;

  background-color: ${$.theme.primary};
  background-image: url(${$.prop('image')});
  background-size: cover;
  background-position: right center;
  backface-visibility: hidden;
  clip: rect(auto, auto, auto, auto);

  transition: left ${TIME}ms;
  position: fixed;

  overflow: hidden;

  &.active {
    opacity: 0.5;
  }

`::Visible.observe(true)

const Links = styled.div.attrs(props => ({
  children: props
    .to
    .map(link => <NavLink
      key={link}
      exact
      to={`/${link === 'latest' ? '' : link}`}>
      {link}
    </NavLink>)
}))`

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end;

  padding: 2em;
  position: fixed;
  font-family: monospace;
  z-index: 2000;
  top: 0em;
  right: 0em;


  a {
    text-decoration: none;
    flex-shrink: 1;
    text-align: center;
    color: ${$.theme.bg};
    font-weight: bold;

    &:not(:last-child) {
      margin-right: 0.5em;
    }

    &.active {
      opacity: 0.25;
      pointer-events: none;
      font-weight: normal;
    }
    transition: opacity 250ms;
  }
`

const Boss = styled(Header).attrs({
  children: 'BOSS'
})``::Visible.observe(false)

const Media = styled(Header).attrs({
  children: 'MEDIA'
})`
  margin-left: 0.2em;
`::Visible.observe(false)

const Title = styled(({ bg, ...rest }) => <div {...rest}>
  <Boss bg={bg}/>
  <Media bg={bg}/>
</div>)`
  position: fixed;
  top: 0em;
  left: calc(20.5vw);
  top: 1em;
  overflow: clip;
`

const Guide = styled.span`
  background-color: rgba(0,255,0,0.5);
  width: 1em;
  height: 1em;

  top: calc(50% - 0.5em);
  left: calc(50% - 0.5em);
  border-radius: 50%;
  position: fixed;
  display: ${process.env.NODE_ENV === 'production' ? 'none' : 'initial'};
`

/******************************************************************************/
// Main Component
/******************************************************************************/

class Navigation extends React.Component {

  state = {
    stage: STAGES[0]
  }

  componentDidMount () {
    this.advanceStage()
  }

  advanceStage () {

    const currentStage = this.state.stage
    const nextStage = STAGES::adjacent(currentStage)
    const time = currentStage === STAGES::first()
      ? TRANSITSION_TIME * 0.5
      : TRANSITSION_TIME

    if (nextStage !== STAGES::last())
      setTimeout(
        () => this.dom && this.setState({ stage: nextStage }),
        time
      )
  }

  componentDidUpdate (prevProps, prevState) {

    if (prevState.stage !== this.state.stage)
      this.advanceStage()
  }

  getRef = dom => { this.dom = dom }

  render () {

    const { location, image } = this.props

    const page = getPage(location)

    const links = [
      'about',
      'hq',
      'shorts',
      'latest'
    ].filter(is.defined)

    return <>
      <Links to={links}/>
      <Title id='title-white'/>
      <Container image={image}>
        <Title bg id='title-black'/>
      </Container>
      <Guide id='movement-guide'/>
    </>
  }

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Navigation)
