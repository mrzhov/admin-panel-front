import React, { useState, createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from 'react-transition-group/Transition'
import useUserApi from '../../api/userApi';
import Avatar from "./img/avatar.jpg";
import routes from "../../route/routes";

import './index.scss';

const Dropdown = () => {
    const userApi = useUserApi();
    const [flags, setFlags] = useState({ showDropdown: false });
    const wrapperRef = createRef();

    useEffect(() => {
        const handleClickOutside = event => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setFlags({ showDropdown: false })
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className='dropdown' ref={wrapperRef}>
            <button
                className={`dropdown__toggle ${flags.showDropdown ? 'dropdown__toggle_active' : ''}`}
                onClick={() => setFlags({ showDropdown: !flags.showDropdown })}
            >
                <img src={Avatar} alt="Avatar"/>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 6C4.81043 6 4.63809 5.92944 4.50022 5.78831L0.191774 1.2018C-0.0667329 0.919558 -0.0667372 0.478551 0.209003 0.196304C0.484744 -0.0683022 0.9156 -0.0683011 1.19134 0.213946L5 4.27124L8.80868 0.213946C9.06719 -0.0683011 9.51526 -0.0683022 9.791 0.196304C10.0667 0.46091 10.0667 0.919558 9.80821 1.2018L5.49978 5.78831C5.36191 5.92944 5.18957 6 5 6Z"
                        fill="#3c3c46"/>
                </svg>
            </button>
            <Transition in={flags.showDropdown} timeout={300}>
                {
                    (state) => {
                        return (
                            <div
                                className={`dropdownMenu dropdownMenu_${state}`}
                            >
                                <Link to={routes.agentInfoPage.path.replace(':id', 'me')}>
                                    <button onClick={() => setFlags({ showDropdown: false })}>
                                        <div className='dropdownMenu__item'>
                                            <span>User info</span>
                                        </div>
                                    </button>
                                </Link>
                                <Link to={routes.changePasswordPage.path.replace(':id', 'me')}>
                                    <button onClick={() => setFlags({ showDropdown: false })}>
                                        <div className='dropdownMenu__item'>
                                            <span>Change password</span>
                                        </div>
                                    </button>
                                </Link>
                                <Link to='/'>
                                    <button onClick={userApi.logout}>
                                        <div className='dropdownMenu__item'>
                                            <span>Sign out</span>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        )
                    }
                }
            </Transition>
        </div>
    )
}

export default Dropdown;
