import React from 'react';
import './style.scss';

export default ({text}) => (
    <div className='textContainer'>
        <div className='textContainer__wrapper'>
            <p>{text}</p>
        </div>
    </div>
)
