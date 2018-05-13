import 'normalize.css'
import './public/boss-media-www.css'

/******************************************************************************/
// Dynamic Dependencies
/******************************************************************************/

const dependencies = Promise.all([
  import('react'),
  import('react-dom'),
  import('../ui/root')
])

/******************************************************************************/
// Execute
/******************************************************************************/

window.addEventListener('load', async () => {
  const [
    { default: React },
    { hydrate },
    { default: Website }
  ] = await dependencies

  const tag = document.getElementById('boss-media-www')
  const element = <Website />

  hydrate(element, tag)
})
