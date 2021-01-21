import React from 'react';
import classNames from 'classnames';

import Input from '../Input/index';
import Select from '../Select/index';

import './style.scss';

const FormControl = ({error, select, textarea, className, ...props}) => {
    const Component = select ? Select : Input;

    let component;
    if (!select && textarea) {
        component = 'textarea';
    }

    return (
        <div className={classNames('my-form-control', {textarea}) + `${' ' + className || ''}`}>
            <Component
                {...props}
                component={component}
            />
        </div>
  )
};

export default FormControl;
