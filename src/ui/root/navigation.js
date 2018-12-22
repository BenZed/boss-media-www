import React from 'react'
import styled from 'styled-components'

import { withRouter, matchPath } from 'react-router'
import { NavLink } from 'react-router-dom'

import { Write } from '@benzed/react'

import is from 'is-explicit'

import { $ } from '../theme'
import { media } from '../util'

/******************************************************************************/
// Helper
/******************************************************************************/

const getPage = location =>
  matchPath(location.pathname, { path: '/:page?' }).params.page || 'home'

const polygonFromPage = ({ page }) => {

  let polygon = `calc(100% - 10em) 0%,` +
  ` 100% 0%,` +
  ` 100% 0%,` +
  ` 100% 10em`

  if (page === 'about')
    polygon = `calc(100% - 6.5em) 0%, 100% 0%, 100% 100%, calc(100% - 6.5em) 100%`

  if (page === 'home')
    polygon = `50% 0%, 100% 0%, 100% 100%, 50% 100%`

  return polygon
}

const titleLeftFromPage = ({ page }) => {

  let left = '20.5vw'

  if (page !== 'home')
    left = '1em'

  return left
}

const headerTextFromPage = page => {

  let text = page === 'home'
    ? 'media'
    : page.replace(/-|_/g, ' ')

  if (text.length > 25)
    text = text.substr(0, 22) + '...'

  return text.toUpperCase()

}

const fontSizeFromPage = (isSecondWord) => ({ page }) => {

  const scale = isSecondWord && page !== 'home' ? 0.7 : 1

  let fontSize = `${10 * scale}vw`

  if (page !== 'home')
    fontSize = `${6 * scale}vw`

  return fontSize

}

const bottomFromPage = ({ page }) => {
  let bottom = `calc(100% - 6vw - 2.5em)`
  if (page === 'home')
    bottom = '100%'

  return bottom
}

/******************************************************************************/
// Styles
/******************************************************************************/

const Header = styled.h1`
  font-size: 10vw;
  transform: scale(1, 1.1);
  letter-spacing: -0.07em;
  display: inline;

  transition: transform 250ms, font-size 250ms;

  color: ${$.ifProp('bg').theme.bg.else.theme.fg};
`

const OrangeCover = styled.div`

  width: 100%;
  height: 100%;

  background-color: ${$.theme.primary};
  background-image: url(${$.prop('image')});
  background-size: cover;
  background-position: center center;
  clip-path: polygon(${polygonFromPage});

  transition: clip-path 250ms;
  position: fixed;
  pointer-events: none;

  overflow: hidden;

`

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

  padding: 1em;
  position: fixed;
  z-index: 750;
  font-family: monospace;
  line-height: 1.25em;

  right: 0em;

  ${media.mini.css`
    padding: 0.5em;
    font-size: 80%;
    line-height: 1.5em;
  `}

  transition: padding 250ms;

  a {
    text-decoration: none;
    flex-shrink: 1;
    text-align: center;
    color: ${$.theme.bg};
    font-weight: bold;

    &.active {
      opacity: 0.25;
      pointer-events: none;
      font-weight: normal;
    }
    transition: opacity 250ms;
  }
`

const WriteHeader = styled(Header).attrs({
  children: props => <Write time={50} medthod='right'>{
    headerTextFromPage(props.page)
  }</Write>
})`
  margin-left: 0.4em;
  font-size: 8vw;
  color: ${$.ifProp('bg').theme.bg.else.theme.primary};
  white-space: nowrap;
`

const TitleContainer = styled.div`
  position: fixed;
  top: 0em;
  right: 0em;
  left: 0em;
  bottom: ${bottomFromPage};

  transition: bottom 250ms;

  background-color: ${$.theme.bg.fade(0.25)};
`

const Title = styled(({ bg, children, page, ...rest }) =>
  <div {...rest}>
    <Header bg={bg} page={page} >BOSS</Header>
    <WriteHeader bg={bg} page={page} />
  </div>)`
  position: fixed;

  ${Header} {
    font-size: ${fontSizeFromPage()};
    &:nth-child(2) {
      font-size: ${fontSizeFromPage(true)};
    }
  }

  top: 1em;
  left: ${titleLeftFromPage};

  transition: left 250ms;
`

/******************************************************************************/
// Main Component
/******************************************************************************/

const Navigation = (props) => {

  const { location, image } = props

  const page = getPage(location)

  const links = [
    'hq',
    'shorts',
    // 'about', TODO add back in
    'latest'
  ].filter(is.defined)

  return <>

    <TitleContainer page={page} />
    <Title page={page} />

    <OrangeCover image={image} page={page}>
      <Title bg page={page} links={links} />
    </OrangeCover>

    <Links to={links}/>

  </>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Navigation)
