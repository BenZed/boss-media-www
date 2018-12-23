import React from 'react'
import styled from 'styled-components'

import Page from './Page'
import { Slide } from '@benzed/react'

import { Link } from 'react-router-dom'
import { urlify } from '../util'
import { Video } from '../components'

/******************************************************************************/
// Styles
/******************************************************************************/

const Latest = styled(({ latest, ...rest }) => console.log(latest.playlist) ||
  <div {...rest}>

    <Video video={latest?.video} size={2.25} coverDirection='right'/>

    <Link to={`/${urlify(latest.playlist.title)}`}>
      Previous Boss {latest.playlist.title}
    </Link>

  </div>)`

  display: flex;
  flex-direction: column;
  align-items: center;


  > div {
    position: relative;
  }

  > a {
    margin-top: 1em;
    font-size: 1.5em;
  }

  margin-top: calc(10vw + 2em);

`

const Home = styled(Page)`
  z-index: 500;
  overflow: hidden;
`

/******************************************************************************/
// Main
/******************************************************************************/

const HomePage = ({ latest }) =>
  <Slide from='left' to='bottom'>
    <Home>
      <Latest latest={latest} />
    </Home>
  </Slide>

/******************************************************************************/
// Exports
/******************************************************************************/

export default HomePage
