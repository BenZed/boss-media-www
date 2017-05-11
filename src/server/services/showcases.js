import service from 'feathers-mongodb'

import { service as gearsService, sync } from 'modules/gears'
import { disable } from 'feathers-hooks'

/******************************************************************************/
// Hooks
/******************************************************************************/

const disableExternal = disable('external')
const SCOPES = ['private', 'public', 'work-in-progress']

function websiteFilter(hook, next) {

  const { result, params } = hook

  //no filtering on internal calls
  if (!params.provider)
    return next()

  //only send showcases with public or private scopes
  hook.result = result.filter(showcase => showcase.website && SCOPES.includes(showcase.website.scope))

  next(null, hook)
}

const beforeHooks  = {
  get: disableExternal,
  create: disableExternal,
  update: disableExternal,
  patch: disableExternal
}

const afterHooks = {
  find: websiteFilter
}

/******************************************************************************/
// Initialize
/******************************************************************************/

export default function() {
  const app = this

  const options = {
    Model: app.db.collection('showcases')
  }

  app.use('/assets/showcases', service(options))

  const webShowcases = app.service('assets/showcases')
  const showcases = gearsService('showcases')

  webShowcases.before(beforeHooks)
  webShowcases.after(afterHooks)

  const files = {
    path: 'files',
    thumb: '360',
    full: true,
    meta: true
  }

  const portrait = {
    path: 'portrait',
    thumb: '640',
    full: false
  }

  sync(showcases, webShowcases, portrait, files)

}
