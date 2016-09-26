'use strict';

var _isExplicit = require('is-explicit');

var _isExplicit2 = _interopRequireDefault(_isExplicit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import 'source-map-support/register'

/******************************************************************************/
// Log Methods
/******************************************************************************/

function log() /*args*/{
  log.info.apply(log, arguments);
}

log.types = {};

['debug', 'info', 'error'].forEach(function (type) {
  log.types[type] = true;
  log[type] = function () {
    var _console;

    if (this.types[type]) (_console = console).log.apply(_console, [type + ':'].concat(Array.prototype.slice.call(arguments))); //eslint-disable-line
  };
});

Object.seal(log);

/******************************************************************************/
// Globals
/******************************************************************************/

global.is = _isExplicit2.default;
global.log = log;
//# sourceMappingURL=/Users/bengaumond/Programming/boss-media-www/dist-server-src-maps/global.js.map