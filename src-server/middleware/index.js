import notFound from './not-found-handler'
import logging from './logging'
import errorHandler from 'feathers-errors/handler'

export default function() {

  const app = this

  app.use(notFound())
  app.use(logging(app))
  app.use(errorHandler())

}
