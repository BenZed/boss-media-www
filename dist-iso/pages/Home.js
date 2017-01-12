'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Home;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BossLogo() {
  return _react2.default.createElement(
    'div',
    { id: 'boss-media-logo' },
    _react2.default.createElement(
      'h1',
      { id: 'boss-title' },
      'BOSS'
    ),
    _react2.default.createElement(
      'h1',
      { id: 'media-title' },
      'MEDIA'
    )
  );
}

function Home(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(BossLogo, null),
    children
  );
}