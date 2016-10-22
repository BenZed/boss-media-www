'use strict';

var _seal = require('babel-runtime/core-js/object/seal');

var _seal2 = _interopRequireDefault(_seal);

var _isExplicit = require('is-explicit');

var _isExplicit2 = _interopRequireDefault(_isExplicit);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appModulePath = require('app-module-path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/******************************************************************************/
// Log Methods
/******************************************************************************/

function log() /*args*/{
  log.info.apply(log, arguments);
}

log.types = {};

['debug', 'info', 'error', 'db'].forEach(function (type) {
  log.types[type] = true;
  log[type] = function () {
    var _console;

    if (this.types[type]) (_console = console).log.apply(_console, [type + ':'].concat(Array.prototype.slice.call(arguments))); //eslint-disable-line
  };
});

(0, _seal2.default)(log);

/******************************************************************************/
// Local Module Require
/******************************************************************************/

(0, _appModulePath.addPath)(_path2.default.resolve(__dirname, '../dist-iso-modules'));

/******************************************************************************/
// Globals
/******************************************************************************/

global.is = _isExplicit2.default;
global.log = log;