import React from 'react'
import styled from 'styled-components'

import { Visible, Slide, Write } from '@benzed/react'

import { withRouter, matchPath } from 'react-router'
import { NavLink } from 'react-router-dom'

import { $ } from '../theme'
import is from 'is-explicit'

import { media } from '../util'

import { Video } from '../components'

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

const fontSizeFromPage = (scale = 1) => ({ page }) => {

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
  backface-visibility: hidden;
  clip-path: polygon(${polygonFromPage});

  transition: clip-path 250ms;
  position: fixed;
  pointer-events: none;

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

  padding: 1em;
  position: fixed;
  font-family: monospace;
  z-index: 2000;
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

const Boss = styled(Header).attrs({
  children: 'BOSS'
})``

const Media = styled(Header).attrs({
  children: 'MEDIA'
})`
  margin-left: 0.2em;
`

const PageName = styled(Header).attrs({
  children: props => <Write time={50}>{
    props.page !== 'home'
      ? props.page.toUpperCase().replace(/-/g, ' ')
      : ''
  }</Write>
})`
  margin-left: 0.4em;
  font-size: 8vw;
  color: ${$.ifProp('bg').theme.bg.else.theme.primary};
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
    <Boss bg={bg} page={page} />
    <Media bg={bg} page={page}/>
    <PageName bg={bg} page={page} />
  </div>)`
  position: fixed;

  ${Header} {
    font-size: ${fontSizeFromPage(1)};
    &:nth-child(3) {
      font-size: ${fontSizeFromPage(0.7)};
    }
  }

  top: 1em;
  left: ${titleLeftFromPage};

  transition: left 250ms;
`
// const Guide = styled.span`
//   background-color: rgba(0,255,0,0.5);
//   width: 1em;
//   height: 1em;
//
//   top: calc(50% - 0.5em);
//   left: calc(50% - 0.5em);
//   border-radius: 50%;
//   position: fixed;
//   display: ${process.env.NODE_ENV === 'production' ? 'none' : 'initial'};
// `

const LatestVideo = styled(Video)`

  position: fixed;

  left: 50vw;
  top: calc(10vw + 2em);

  transform: translate(-50%, 0%);

`

/******************************************************************************/
// Main Component
/******************************************************************************/

const Navigation = (props) => {

  const { location, image, latestVideo } = props

  const page = getPage(location)

  const links = [
    'hq',
    'shorts',
    // 'about', TODO add back in
    'latest'
  ].filter(is.defined)

  return <>
    <Links to={links}/>

    <TitleContainer page={page} />
    <Title id='title-white' page={page} />

    <OrangeCover image={image} page={page}>
      <Title bg id='title-black' page={page} links={links} />
    </OrangeCover>

    <Visible visible={page === 'home'}>
      <Slide from='left' to='right'>
        <LatestVideo video={latestVideo} size={2.25} coverDirection='right'/>
      </Slide>
    </Visible>
  </>
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default withRouter(Navigation)
