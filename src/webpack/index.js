import 'normalize.css'
import './public/boss-media-www.css'

/******************************************************************************/
// Dynamic Dependencies
/******************************************************************************/

const dependencies = Promise.all([
  import('@benzed/react'),
  import('ui/components/website')
])

/******************************************************************************/
// Execute
/******************************************************************************/

window.addEventListener('load', async () => {
  const [
    { React, render },
    { default: Website }
  ] = await dependencies

  const tag = document.getElementById('boss-media-www')
  const element = <Website />

  render(element, tag)
})
