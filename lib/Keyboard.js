'use strict';
import React from "react";
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import keyboard from 'virtual-keyboard/dist/js/jquery.keyboard.js';

export default class VirtualKeyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", className: 'keyboard-wrapper' };
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        // Set Value to Input Element on Accept
        this.setState({ value: this.props.value });

        this.props.options.accepted = function(event, keyboard, el) {
            this.handleChange('', el.value);
            if(typeof this.props.onAccepted == 'function') {
                this.props.onAccepted(el.value);
            }
            if(this.props.debug) {
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
            this.props.options.change = function(event, keyboard, el) {
                this.handleChange('', keyboard.preview.value);
                if(this.props.debug) {
                  console.log('The content "' + el.value + '" was changed');
                }
            }.bind(this);
        }

        // Add jQuery Keyboard to DOM Element
        // jQuery(ReactDOM.findDOMNode(this.refs.keyboard)).keyboard(this.props.options);
        this.addKeyBoardToDOM();
        
        // Update while typing if usePreview is false
        if (this.props.options.usePreview === false) {
            jQuery(ReactDOM.findDOMNode(this.refs.keyboard)).on('keyboardChange', function(event, keyboard, el) {
                this.handleChange(null, keyboard.preview.value);
            }.bind(this));
        }
    }
    addKeyBoardToDOM() {
        jQuery(ReactDOM.findDOMNode(this.refs.keyboard)).keyboard(this.props.options);
    }
    clear() {
        this.setState({ value: '' });
    }
    select() {
        this.refs.keyboard.select();
    }
    blur() {
        var keyboard = jQuery(ReactDOM.findDOMNode(this.refs.keyboard));
        if(keyboard && typeof keyboard.getkeyboard == 'function' && typeof keyboard.getkeyboard().close == 'function')
          keyboard.getkeyboard().close();
        this.refs.keyboard.blur();
    }
    checkValidity() {
        return this.refs.keyboard.checkValidity();
    }
    handleChange(event, input) {
        if(!input && event && event.target && typeof event.target.value != 'undefined')
          input = event.target.value;
        if(this.props.debug) {
          console.log("Change", input);
        }
        this.setState({ value: input });
        this.props.onChange(input);
    }
    componentWillUnmount() {
            jQuery(ReactDOM.findDOMNode(this.refs.keyboard)).remove();
    }
    render() {
    var { options, value, validation, onChange, ...other } = this.props;
    if (this.props.options.type == 'textarea') {
         var element = ( <textarea ref="keyboard" value = { this.state.value } onChange = { this.handleChange } {...other}/> );
     }
     else {
        var element = ( <input ref="keyboard" value = { this.state.value } onChange = { this.handleChange } {...other} /> );
     }
        return ( <div className={this.state.className} > { element } </div> );
    }
}
