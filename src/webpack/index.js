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
// Data
/******************************************************************************/

const DEV = process.env.NODE_ENV === 'development'

/******************************************************************************/
// Helper
/******************************************************************************/

let getServerProps

if (DEV)
  getServerProps = async () => {

    const { default: Client } = await import('@benzed/dev/lib/test-util/test-client')
    const { port } = await import('../../config/default.json')

    const client = new Client({
      port,
      provider: 'rest'
    })

    // In production, we wont need a feathers side client because all this
    // information will be serialized in the request.

    const playlists = await client.service('playlists').find({})
    const videos = await client.service('videos').find({})

    return { playlists, videos }
  }

else
  getServerProps = () => {
    const serverPropsTag = document.getElementById('boss-media-www-server-props')

    let props
    try {
      props = JSON.parse(serverPropsTag.textContent)
    } catch (err) {
      // it could be that the server sent bad data, but generally any failure
      // will simply mean no data has been sent
    }

    // make double sure we're sending back an object
    return props !== null && typeof props === 'object'
      ? props
      : {}
  }

const getMainTag = () =>
  document.getElementById('boss-media-www')

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

  const props = await getServerProps()
  const main = getMainTag()

  const element = <BrowserRouter>
    <Website {...props} />
  </BrowserRouter>

  hydrate(element, main)
})
