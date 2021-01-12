import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import errorIcon from '../../image/error.svg';

import './style.scss';

const FormControl = ({error, select, textarea, className, ...props}) => {
    //const Component = select ? Select : Input;
    const Component = '';

    let component;

    if (!select && textarea) {
        component = 'textarea';
    }

    return (
        <div className={classNames('my-form-control', {textarea, error}) + ` ${className}`}>
            <Component
                {...props}
                component={component}
            />
            {error && <ReactSVG
                className='my-form-control-icon'
                src={errorIcon}
            />}
        </div>
  )
};

export default FormControl;
