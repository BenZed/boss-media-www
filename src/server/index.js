import './globals'
import initialize from './app'

/******************************************************************************/
// Server
/******************************************************************************/

initialize.then(app => {

  const port = app.get('port')
  const server = app.listen(port, '0.0.0.0')
  server.on('listening', () => log(`App enabled. Server listening on port ${port}`))

})
