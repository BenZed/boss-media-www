import 'normalize.css'
import './index.css'
import * as assets from './assets'

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

    const { ClientStateTree } = await import('@benzed/react')
    const { port } = await import('../../config/default.json')

    // origin - webpack port + default server port
    const host = location.origin.substr(0, location.origin.length - 4) + `${port}`

    const client = new ClientStateTree({
      hosts: host,
      provider: 'rest'
    })

    await client.connect()

    const [ $$feathers ] = Object
      .getOwnPropertySymbols(client)
      .filter(sym => sym.toString().includes('feathers'))

    const feathers = client[$$feathers]

    // In production, we wont need a feathers side client because all this
    // information will be serialized in the request.

    const playlists = await feathers.service('playlists').find({})
    const videos = await feathers.service('videos').find({})

    return { playlists, videos }
  }

else
  getServerProps = () => {
    const serverPropsTag = document.getElementById('boss-media-www-serialized')

    let props
    try {
      serverPropsTag.remove()
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

void async function () { // eslint-disable-line wrap-iife

  const [
    { default: React },
    { hydrate },
    { BrowserRouter },
    { Website }
  ] = await dependencies

  const props = await getServerProps()
  const main = getMainTag()

  const element = <BrowserRouter>
    <Website images={assets} {...props} />
  </BrowserRouter>

  hydrate(element, main)

}()
