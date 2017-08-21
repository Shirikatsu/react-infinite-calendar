'use strict';

exports.__esModule = true;
exports.default = defaultSelectionRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _parse = require('date-fns/parse');

var _parse2 = _interopRequireDefault(_parse);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  'root': 'Cal__Header__root',
  'landscape': 'Cal__Header__landscape',
  'dateWrapper': 'Cal__Header__dateWrapper',
  'day': 'Cal__Header__day',
  'wrapper': 'Cal__Header__wrapper',
  'blank': 'Cal__Header__blank',
  'active': 'Cal__Header__active',
  'year': 'Cal__Header__year',
  'date': 'Cal__Header__date',
  'range': 'Cal__Header__range'
};
var animation = {
  'enter': 'Cal__Animation__enter',
  'enterActive': 'Cal__Animation__enterActive',
  'leave': 'Cal__Animation__leave',
  'leaveActive': 'Cal__Animation__leaveActive'
};


var fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function defaultSelectionRenderer(value, _ref, type) {
  var display = _ref.display,
      key = _ref.key,
      locale = _ref.locale.locale,
      dateFormat = _ref.dateFormat,
      onYearClick = _ref.onYearClick,
      scrollToDate = _ref.scrollToDate,
      setDisplay = _ref.setDisplay,
      shouldAnimate = _ref.shouldAnimate;

  var date = (0, _parse2.default)(value);

  if (type == 1) {
    var values = date && [{
      active: display === 'years',
      handleClick: function handleClick(e) {
        onYearClick(date, e, key);
        setDisplay('years');
      },
      item: 'year',
      title: display === 'days' ? 'Change year' : null,
      value: date.getFullYear()
    }, {
      active: display === 'days',
      handleClick: function handleClick(e) {
        if (display !== 'days') {
          setDisplay('days');
        } else if (date) {
          scrollToDate(date, -40, true);
        }
      },
      item: 'day',
      title: display === 'days' ? 'Scroll to ' + (0, _format2.default)(date, dateFormat, { locale: locale }) : null,
      value: (0, _format2.default)(date, dateFormat, { locale: locale })
    }];

    return _react2.default.createElement(
      'div',
      {
        key: key,
        className: styles.wrapper,
        'aria-label': (0, _format2.default)(date, dateFormat + ' YYYY', { locale: locale })
      },
      values.map(function (_ref2) {
        var _classNames;

        var handleClick = _ref2.handleClick,
            item = _ref2.item,
            key = _ref2.key,
            value = _ref2.value,
            active = _ref2.active,
            title = _ref2.title;

        return _react2.default.createElement(
          'div',
          {
            key: item,
            className: (0, _classnames2.default)(styles.dateWrapper, styles[item], (_classNames = {}, _classNames[styles.active] = active, _classNames)),
            title: title
          },
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              transitionName: animation,
              transitionEnterTimeout: 250,
              transitionLeaveTimeout: 250,
              transitionEnter: shouldAnimate,
              transitionLeave: shouldAnimate
            },
            _react2.default.createElement(
              'span',
              {
                key: item + '-' + value,
                className: styles.date,
                'aria-hidden': true,
                onClick: handleClick
              },
              value
            )
          )
        );
      })
    );
  } else {
    var _values = date && [{
      active: display === 'years',
      item: 'year',
      value: date.getFullYear()
    }, {
      active: display === 'days',
      item: 'day',
      value: fullMonths[date.getMonth()]
    }];

    return _react2.default.createElement(
      'div',
      {
        key: key,
        className: styles.wrapper,
        'aria-label': value
      },
      _values.map(function (_ref3) {
        var _classNames2;

        var item = _ref3.item,
            key = _ref3.key,
            value = _ref3.value,
            active = _ref3.active;

        return _react2.default.createElement(
          'div',
          {
            key: item,
            className: (0, _classnames2.default)(styles.dateWrapper, styles[item], (_classNames2 = {}, _classNames2[styles.active] = active, _classNames2))
          },
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              transitionName: animation,
              transitionEnterTimeout: 250,
              transitionLeaveTimeout: 250,
              transitionEnter: shouldAnimate,
              transitionLeave: shouldAnimate
            },
            _react2.default.createElement(
              'span',
              {
                key: item + '-' + value,
                className: styles.date,
                'aria-hidden': true
              },
              value
            )
          )
        );
      })
    );
  }
}
module.exports = exports['default'];