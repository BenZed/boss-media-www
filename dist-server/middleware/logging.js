'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  return function (error, req, res, next) {
    if (error) {
      var message = (error.code ? '(' + error.code + ') ' : '') + 'Route: ' + req.url + ' - ' + error.message;

      if (error.code === 404) {
        log(message);
      } else {
        log.error(message);
        log(error.stack);
      }
    }

    next(error);
  };
};