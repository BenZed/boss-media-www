'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navigation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavigationLink(_ref) {
  var to = _ref.to,
      children = _ref.children;

  return _react2.default.createElement(
    _reactRouter.Link,
    { className: 'padded inline block right', to: to },
    _react2.default.createElement(
      'h3',
      null,
      children
    )
  );
}

function Navigation(_ref2) {
  var children = _ref2.children;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('div', { id: 'navigation' }),
    children
  );
}