import './globals'
import app from './app'

const port = app.get('port')
const server = app.listen(port, '0.0.0.0')

server.on('listening', () => log(`Server enabled. Server listening on port ${port}`))
