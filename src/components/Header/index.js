import React from 'react';
import { withRouter } from 'react-router-dom';
import Dropdown from "../Dropdown";

import './index.scss';

const Header = () => {
    return (
        <nav className='header'>
            <div className='header__wrapper'>
                <Dropdown/>
            </div>
        </nav>
    )
}

export default withRouter(Header);
