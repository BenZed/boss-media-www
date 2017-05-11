import service from 'feathers-mongodb'

import { service as gearsService, sync } from 'modules/gears'

import { disable } from 'feathers-hooks'

/******************************************************************************/
// Hooks
/******************************************************************************/

const disableExternal = disable('external')

function websiteFilter(hook, next) {

  const { result, params } = hook

  //no filtering on internal calls
  if (!params.provider)
    return next()

  //only send people intended to be on the website
  hook.result = result.filter(person =>
    (person.staffData && person.staffData.showOnWebsite) ||
    (person.directorData && person.directorData.showOnWebsite))

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
    Model: app.db.collection('users')
  }

  app.use('/assets/people', service(options))

  const people = app.service('assets/people')
  const users = gearsService('users')

  people.before(beforeHooks)
  people.after(afterHooks)

  const staff = {
    path: ['staffData', 'portrait'],
    thumb: '480',
    full: false
  }

  const director = {
    path: ['directorData', 'portrait'],
    thumb: '480',
    full: false
  }

  sync(users, people, staff, director)

}
