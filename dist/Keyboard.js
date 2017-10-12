'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _jqueryKeyboard = require('virtual-keyboard/dist/js/jquery.keyboard.js');

var _jqueryKeyboard2 = _interopRequireDefault(_jqueryKeyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualKeyboard = function (_React$Component) {
    _inherits(VirtualKeyboard, _React$Component);

    function VirtualKeyboard(props) {
        _classCallCheck(this, VirtualKeyboard);

        var _this = _possibleConstructorReturn(this, (VirtualKeyboard.__proto__ || Object.getPrototypeOf(VirtualKeyboard)).call(this, props));

        _this.state = { value: "", className: 'keyboard-wrapper' };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(VirtualKeyboard, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Set Value to Input Element on Accept
            this.setState({ value: this.props.value });

            this.props.options.accepted = function (event, keyboard, el) {
                this.handleChange('', el.value);
                if (typeof this.props.onAccepted == 'function') {
                    this.props.onAccepted(el.value);
                }
                if (this.props.debug) {
                    console.log('The content "' + el.value + '" was accepted');
                }
            }.bind(this);

            // Set Class to visible
            this.props.options.visible = function function_name(event, keyboard, el) {
                this.setState({ className: 'keyboard-wrapper open' });
            }.bind(this);

            this.props.options.hidden = function function_name(event, keyboard, el) {
                this.setState({ className: 'keyboard-wrapper' });
            }.bind(this);

            // Set Value to Input Element on Change if prop set
            if (this.props.options.updateOnChange == true) {
                this.props.options.change = function (event, keyboard, el) {
                    this.handleChange('', keyboard.preview.value);
                    if (this.props.debug) {
                        console.log('The content "' + el.value + '" was changed');
                    }
                }.bind(this);
            }

            // Add jQuery Keyboard to DOM Element
            // jQuery(ReactDOM.findDOMNode(this.refs.keyboard)).keyboard(this.props.options);
            this.addKeyBoardToDOM();

            // Update while typing if usePreview is false
            if (this.props.options.usePreview === false) {
                (0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs.keyboard)).on('keyboardChange', function (event, keyboard, el) {
                    this.handleChange(null, keyboard.preview.value);
                }.bind(this));
            }
        }
    }, {
        key: 'addKeyBoardToDOM',
        value: function addKeyBoardToDOM() {
            (0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs.keyboard)).keyboard(this.props.options);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setState({ value: '' });
        }
    }, {
        key: 'select',
        value: function select() {
            this.refs.keyboard.select();
        }
    }, {
        key: 'blur',
        value: function blur() {
            var keyboard = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs.keyboard));
            if (keyboard && typeof keyboard.getkeyboard == 'function' && typeof keyboard.getkeyboard().close == 'function') keyboard.getkeyboard().close();
            this.refs.keyboard.blur();
        }
    }, {
        key: 'checkValidity',
        value: function checkValidity() {
            return this.refs.keyboard.checkValidity();
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event, input) {
            if (!input && event && event.target && typeof event.target.value != 'undefined') input = event.target.value;
            if (this.props.debug) {
                console.log("Change", input);
            }
            this.setState({ value: input });
            this.props.onChange(input);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs.keyboard)).remove();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                options = _props.options,
                value = _props.value,
                validation = _props.validation,
                onChange = _props.onChange,
                other = _objectWithoutProperties(_props, ['options', 'value', 'validation', 'onChange']);

            if (this.props.options.type == 'textarea') {
                var element = _react2.default.createElement('textarea', _extends({ ref: 'keyboard', value: this.state.value, onChange: this.handleChange }, other));
            } else {
                var element = _react2.default.createElement('input', _extends({ ref: 'keyboard', value: this.state.value, onChange: this.handleChange }, other));
            }
            return _react2.default.createElement(
                'div',
                { className: this.state.className },
                ' ',
                element,
                ' '
            );
        }
    }]);

    return VirtualKeyboard;
}(_react2.default.Component);

exports.default = VirtualKeyboard;
