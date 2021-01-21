import React from 'react';
import {withRouter} from 'react-router-dom';

import './style.scss';
import Dropdown from "../Dropdown";

const Header = props => {
    return (
        <nav className='header'>
            <div className='header__wrapper'>
                {/*<div className='header__support'>*/}
                {/*    <span>Support: </span>*/}
                {/*    <ul>*/}
                {/*        <li>Email: <span>test@gmail.com</span></li>*/}
                {/*        <li>Phone: <span>+79999999999</span></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <Dropdown />
            </div>
        </nav>
    )
}

export default withRouter(Header);
