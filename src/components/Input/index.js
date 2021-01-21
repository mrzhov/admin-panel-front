import React from 'react';

import {getRandom} from '../../lib/functions';

import './style.scss';

const getClassName = props => {
    let className = 'Input';
    if (props.className) className += ` ${props.className}`;
    if (props && (props.value || props.value === 0)) className += ' Input_active';
    return className;
};

class Input extends React.Component {
    ID = getRandom();

    getInputTag = (props, id) => {
        const Component = props.inputComponent || 'input';

        if (props.type !== 'textarea')
            return (
                <Component
                    className='Input__TextField'
                    id={this.ID}
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                    required={props.required}
                    onChange={props.onChange}
                    style={props.style}
                    type={props.type}
                    value={props.value}
                />
            );
        return (
            <textarea
                className='Input__TextField TextArea'
                cols={props.cols}
                id={this.ID}
                maxLength={props.maxLength}
                rows={props.rows}
                style={props.style}
            />
        );
    };

    render() {
        return (
            <div className={getClassName(this.props)}>
                {this.getInputTag(this.props, this.props.label)}
                <label htmlFor={this.ID}>{this.props.label}</label>
            </div>
        );
    }
}

export default Input;
