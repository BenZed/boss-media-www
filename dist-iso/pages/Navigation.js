'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navigation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavigationLink(_ref) {
  var to = _ref.to,
      children = _ref.children;

  return _react2.default.createElement(
    _reactRouter.Link,
    { className: 'block right', to: to },
    children
  );
}

function Navigation(_ref2) {
  var children = _ref2.children,
      location = _ref2.location;


  var atHome = location.pathname === '/';

  var classes = (0, _classnames2.default)({
    'splash': atHome
  });

  return _react2.default.createElement(
    'div',
    { id: 'container', className: classes },
    _react2.default.createElement(
      'h1',
      { id: 'boss' },
      'Boss'
    ),
    _react2.default.createElement(
      'h1',
      { id: 'media' },
      'Media'
    ),
    _react2.default.createElement(
      'div',
      { id: 'navigation', className: 'flex column' },
      _react2.default.createElement(
        NavigationLink,
        { to: '/' },
        'Home'
      ),
      _react2.default.createElement(
        NavigationLink,
        { to: '/about' },
        'Videos'
      ),
      _react2.default.createElement(
        NavigationLink,
        { to: '/hq' },
        'Behind The Scenes'
      )
    ),
    children
  );
}