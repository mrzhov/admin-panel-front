import React from 'react';
import {connect} from 'react-redux';

import {Link, NavLink, withRouter} from 'react-router-dom';

import './style.scss';
import {logout} from '../../api/authUserApi';
import logo from "../../image/logo.svg";

const SideBar = props => {

    const handleLogout = () => {
        props.logout();
    }

    return (
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
                <Link to='/admin'>
                    <button onClick={handleLogout}>
                        <div className='sidebar__link'>
                            <span>Exit</span>
                        </div>
                    </button>
                </Link>
            </div>
        </nav>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: (...args) => dispatch(logout(...args))
});

export default withRouter(
    connect(null, mapDispatchToProps)(SideBar)
);
