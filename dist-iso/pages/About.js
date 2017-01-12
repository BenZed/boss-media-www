'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = About;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function About(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      null,
      'About'
    ),
    children
  );
}