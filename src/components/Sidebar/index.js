import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../image/logo.svg";
import './index.scss';

const SideBar = ({ options }) => (
    <nav className='sidebar'>
        <div className='sidebar__header'>
            <div className='sidebar__logo'>
                <img src={logo} alt="Logo"/>
                <span>Pluribus</span>
            </div>
        </div>
        <div className='sidebar__menu'>
            {options.map((page, i) => (
                <NavLink
                    activeClassName='sidebar__link_active'
                    className='sidebar__link'
                    key={i}
                    to={page.url}
                >
                    <span>{page.name}</span>
                </NavLink>
            ))}
        </div>
    </nav>
)

export default SideBar;
