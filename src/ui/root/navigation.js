import React from 'react'
import styled from 'styled-components'

import { Visible } from '@benzed/react'

import { withRouter, matchPath } from 'react-router'
import { NavLink } from 'react-router-dom'

import { $ } from '../theme'
import is from 'is-explicit'

import { TIME, NAV_MARGIN } from '../constants'

/******************************************************************************/
//
/******************************************************************************/

const Title = styled.h1`
  font-size: 10vw;
  transform: scale(1, 1.1);
  letter-spacing: -0.07em;
  position: absolute;

  top: 50%;

  transition: transform ${TIME}ms;
`

const Container = styled.div`
  right: 0;
  left: ${$.prop('visibility').mut(v =>
  v === 'shown'
    ? '50%'
    : `calc(100vw - ${NAV_MARGIN}em)`)
  };
  bottom: 0;
  top: 0;

  background-color: ${$.theme.primary};

  transition: left ${TIME}ms;
  position: fixed;

  &.active {
    opacity: 0.5;
  }

  display: flex;

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
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em;
  position: sticky;
  font-family: monospace;

  a {
    text-decoration: none;
    flex-shrink: 1;
    flex-basis: 4em;
    text-align: center;
  }
`

const Boss = styled(Title).attrs({
  children: 'BOSS'
})`

  right: calc(50vw + 0.2em);

  transform: ${$.prop('visibility').mut(v => v !== 'shown'
  ? 'translate(-100vw, -50%)'
  : 'translate(0vw, -50%)')
  };

`::Visible.observe(false)

const Media = styled(Title).attrs({
  children: 'MEDIA'
})`

  left: 0.115em;

  transform: ${$.prop('visibility').mut(v => v !== 'shown'
  ? 'translate(100vw, -50%)'
  : 'translate(0vw, -50%)')
  };

  color: ${$.theme.bg};
`::Visible.observe(false)

/******************************************************************************/
// Main Component
/******************************************************************************/

const Navigation = ({ children, location, ...props }) => {

  const isAtHome = !!matchPath(location.pathname, { path: '/', exact: true })

  const links = [
    'about',
    'hq',
    'shorts',
    isAtHome ? null : 'latest'
  ].filter(is.defined)

  return <Visible visible={isAtHome} delay={TIME}>
    <Container>
      <Links to={links}/>
      <Boss/><Media/>
    </Container>
  </Visible>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Navigation)
