import React from 'react';
import ReactSelect from "react-select";

import './style.scss';

const getClassName = props => {
    let className = 'Select';
    if (props.className) className += ` ${props.className}`;
    return className;
};

const customStyles = {
    menu: (provided) => ({
        ...provided,
        width: '100%',
        fontSize: 14,
        padding: 10,
    }),

    valueContainer: (provided) => ({
        ...provided,
        fontSize: 14,
        padding: '5px 15px',
    }),

    control: (provided) => ({
        ...provided,
        cursor: 'pointer',
        borderColor: '#dee2e6'
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}

class Select extends React.Component {
    render() {
        return (
            <div className={getClassName(this.props)}>
                <ReactSelect
                    styles={customStyles}
                    options={this.props.options}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#2196f3',
                        },
                    })}
                />
                {!this.props.disabled && (
                    <input
                        className="input-required"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        required={this.props.required}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                )}
            </div>
        );
    }
}

export default Select;
