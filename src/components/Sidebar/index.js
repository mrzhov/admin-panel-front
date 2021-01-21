import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import './style.scss';
import logo from "../../image/logo.svg";

const SideBar = props => (
    <nav className='sidebar'>
        <div className='sidebar__header'>
            <div className='sidebar__logo'>
                <img src={logo} alt="Logo"/>
                <span>Pluribus</span>
            </div>
        </div>
        <div className='sidebar__menu'>
            {props.options.map((page, i) => (
                <NavLink
                    activeClassName='sidebar__link_active'
                    className='sidebar__link'
                    key={i}
                    //onClick={this.handleClick}
                    to={page.url}
                >
                    <span>{page.name}</span>
                </NavLink>
            ))}
        </div>
    </nav>
)

export default withRouter(SideBar);
