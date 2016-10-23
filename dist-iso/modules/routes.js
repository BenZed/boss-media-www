'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _pages = require('pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _pages.Navigation },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _pages.Home }),
    _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _pages.About })
);