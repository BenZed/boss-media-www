import React from 'react'
import styled from 'styled-components'

import { Visible } from '@benzed/react'

import { withRouter, matchPath } from 'react-router'
import { NavLink } from 'react-router-dom'

import { $ } from '../theme'

/******************************************************************************/
// Data
/******************************************************************************/

const TIME = 500 // ms

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
  flex-basis: ${$.prop('visibility').mut(v => v === 'shown' ? '50%' : '0%')};

  background-color: ${$.theme.primary.mut(v => String(v))};
  margin-left: auto;

  transition: flex-basis ${TIME}ms;
  position: relative;

  display: flex;

`::Visible.observe(true)

const Links = styled.div.attrs({
  children: props => props
    .to
    .map(link => <NavLink key={link} to={`/${link}`}>{link}</NavLink>)
})`

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em;

  a {
    text-decoration: none;
    flex-shrink: 1;
    flex-basis: 4em;
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

  color: ${$.theme.bg.mut(v => v.toString())};
`::Visible.observe(false)

/******************************************************************************/
// Main Component
/******************************************************************************/

const Navigation = ({ children, location, ...props }) => {

  const isAtHome = !!matchPath(location.pathname, { path: '/', exact: true })

  return <Visible visible={isAtHome} delay={TIME}>
    <Container>

      <Links to={[
        'about',
        'videos',
        'vault'
      ]}/>

      <Boss/><Media/>

    </Container>
  </Visible>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Navigation)
