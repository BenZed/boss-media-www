import handler from 'feathers-errors/handler'
import serveFile from './serve-file'
import reactRouterTemplate from './react-router-template'
import logging from './logging'

export default function() {

  const app = this

  app.get('/assets/file/:key', serveFile(app.get('public')))
  app.use(reactRouterTemplate(app))
  app.use(logging(app))
  app.use(handler())

}
