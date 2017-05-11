import service from 'feathers-mongodb'

import { service as gearsService, sync } from 'modules/gears'

import { disable } from 'feathers-hooks'

/******************************************************************************/
// Hooks
/******************************************************************************/

const disableExternal = disable('external')

const beforeHooks  = {
  get: disableExternal,
  create: disableExternal,
  update: disableExternal,
  patch: disableExternal
}

/******************************************************************************/
// Initialize
/******************************************************************************/

export default function() {
  const app = this

  const options = {
    Model: app.db.collection('products')
  }

  app.use('/assets/products', service(options))

  const webProducts = app.service('assets/products')
  const products = gearsService('products')

  webProducts.before(beforeHooks)

  const portrait = {
    path: 'portrait',
    thumb: '640x360',
    full: false
  }

  const images = {
    path: 'images',
    thumb: '400',
    full: true
  }

  sync(products, webProducts, portrait, images)

}
