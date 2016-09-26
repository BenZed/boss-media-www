'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initialize;
function initialize(app) {
  //eslint-disable-line no-unused-vars

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
}
//# sourceMappingURL=/Users/bengaumond/Programming/boss-media-www/dist-server-src-maps/middleware/logging.js.map