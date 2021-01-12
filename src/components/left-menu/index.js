import React from 'react';
import {connect} from 'react-redux';

import {Link, NavLink, withRouter} from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import burger from '../../image/burger.svg';
import logo from '../../image/logo.svg';

import './style.scss';
import {logout} from '../../api/userApi';

class LeftMenu extends React.Component {
    state = {
        isOpen: false,
        pixiu: false
    };

    handleLogout() {
        this.props.logout();
    }

    handleClick() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <nav className='nav-bar'>
                <div className='nav-bar__link-container'>
                    <Link to='/admin/start'>
                        <button className='nav-bar__logo-pixiu'>
                            <img src={logo} alt="Logo"/>
                        </button>
                    </Link>
                </div>
                <div className='nav-bar__app-bar'>
                    <div
                        className='nav-bar__burger'
                        onClick={this.handleClick}
                    >
                        <ReactSVG src={burger}/>
                    </div>
                    <div className='nav-bar__logoMobile'>
                        <Link to='/admin/start'>
                            <button className='nav-bar__logo-pixiu'>
                                <img src={logo} alt="Logo"/>
                            </button>
                        </Link>
                    </div>
                </div>
                <div
                    className={`nav-bar__link-container${
                        this.state.isOpen ? ' nav-bar__link-container_open' : ''
                    }`}
                >
                    {this.props.options.map((page, i) => (
                        <NavLink
                            activeClassName='nav-bar__link_active'
                            className='nav-bar__link'
                            key={i}
                            onClick={this.handleClick}
                            to={page.url}
                        >
                            {page.name}
                        </NavLink>
                    ))}
                    <Link to='/admin'>
                        <button
                            className='nav-bar__link btn-reset btn-logout'
                            onClick={this.handleLogout}
                        >
                            Exit
                        </button>
                    </Link>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    logout: (...args) => dispatch(logout(...args))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LeftMenu)
);
