import 'normalize.css'
import './boss-media-www.css'

/******************************************************************************/
// Dynamic Dependencies
/******************************************************************************/

const dependencies = Promise.all([
  import('react'),
  import('react-dom'),
  import('react-router-dom'),
  import('../ui')
])

/******************************************************************************/
// Helper
/******************************************************************************/

function getServerProps () {
  const serverPropsTag = document.getElementById('boss-media-www-server-props')

  let props
  try {
    const json = serverPropsTag
      .textContent

    props = JSON.parse(json)
  } catch (err) {
    // it could be that the server sent bad data, but generally any failure
    // will simply mean no data has been sent
  }

  // make double sure we're sending back an object
  return props !== null && typeof props === 'object'
    ? props
    : {}

}

function getMainTag () {
  return document.getElementById('boss-media-www')
}

/******************************************************************************/
// Execute
/******************************************************************************/

window.addEventListener('load', async () => {

  const [
    { default: React },
    { hydrate },
    { BrowserRouter },
    { Website }
  ] = await dependencies

  const props = getServerProps()
  const main = getMainTag()

  const element = <BrowserRouter>
    <Website {...props} />
  </BrowserRouter>

  hydrate(element, main)
})
