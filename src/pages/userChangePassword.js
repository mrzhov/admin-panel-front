import React, {useCallback, useEffect, useState} from 'react';

import useUserApi from '../api/usersApi';
import Button from '../components/Button';
import useLegacyState from '../hooks/useLegacyState';
import FormControl from "../components/FormControl";
import {Link} from "react-router-dom";
import routes from "../route/routes";

const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const UserChangePassword = ({history}) => {
    const usersApi = useUserApi();

    const [passwords, setPasswords] = useLegacyState(initialState);

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            setPasswords({[name]: value});
        },
        [passwords]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            const cb = () => history.push(routes.usersPage.path);

            usersApi.changePassword(passwords, cb);
        },
        [passwords]
    );

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper mainPage__center'>
                <div className='formContainer'>
                    <div className="form">
                        <div className='form__title'>
                            <h3>Change Password</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                label='Old password'
                                type='password'
                                className='formItem'
                                maxLength={60}
                                minLength={3}
                                onChange={handleInput('oldPassword')}
                                required
                                value={passwords.oldPassword}
                            />
                            <FormControl
                                label='New password'
                                type='password'
                                className='formItem'
                                maxLength={60}
                                minLength={3}
                                onChange={handleInput('newPassword')}
                                required
                                value={passwords.newPassword}
                            />
                            <FormControl
                                label='Confirm new password'
                                type='password'
                                className='formItem'
                                maxLength={60}
                                minLength={3}
                                onChange={handleInput('confirmNewPassword')}
                                required
                                value={passwords.confirmNewPassword}
                            />
                            <div className='form__actions'>
                                <Button
                                    type='submit'
                                    variant='small'
                                >
                                    Change
                                </Button>
                                <Link to='/admin/users'>
                                    <Button
                                        type='button'
                                        variant='small'
                                        className='secondary'
                                    >
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserChangePassword;
