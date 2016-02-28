'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactPortalWrap = require('react-portal-wrap');

var _reactPortalWrap2 = _interopRequireDefault(_reactPortalWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TransitionPortal = function TransitionPortal(_ref) {
  var children = _ref.children;

  var props = _objectWithoutProperties(_ref, ['children']);

  return _react2.default.createElement(
    _reactPortalWrap2.default,
    null,
    _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      props,
      children
    )
  );
};

TransitionPortal.propTypes = {
  children: _react.PropTypes.node
};

exports.default = TransitionPortal;
module.exports = exports['default'];