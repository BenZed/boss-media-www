import is from 'is-explicit'
//import 'source-map-support/register'

/******************************************************************************/
// Log Methods
/******************************************************************************/

function log(/*args*/) {
  log.info(...arguments)
}

log.types = {};

['debug', 'info', 'error'].forEach(type => {
  log.types[type] = true
  log[type] = function() {
    if (this.types[type])
      console.log(`${type}:`, ...arguments) //eslint-disable-line
  }
})

Object.seal(log)

/******************************************************************************/
// Globals
/******************************************************************************/

global.is = is
global.log = log
