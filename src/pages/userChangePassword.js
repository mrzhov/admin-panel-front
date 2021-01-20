import React, {useCallback, useState} from 'react';

import useUserApi from '../api/usersApi';
import Button from '../components/button';
import useLegacyState from '../hooks/useLegacyState';

const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const UserChangePassword = ({match}) => {
    const usersApi = useUserApi();

    const [passwords, setPasswords] = useLegacyState(initialState);
    const [flags, setFlags] = useState({changed: false})

    const {id} = match.params;

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

            const cb = () => {
                setFlags({changed: true})
            };

            usersApi.changePassword(passwords, cb);
        },
        [passwords]
    );

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Change password</h1>
            </div>

            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <div className='page-block-half'>*/}
            {/*        <FormControl*/}
            {/*            label='Old password'*/}
            {/*            maxLength={60}*/}
            {/*            minLength={3}*/}
            {/*            onChange={handleInput('oldPassword')}*/}
            {/*            required*/}
            {/*            type='password'*/}
            {/*            value={passwords.oldPassword}*/}
            {/*        />*/}
            {/*        <FormControl*/}
            {/*            label='New password'*/}
            {/*            maxLength={60}*/}
            {/*            minLength={3}*/}
            {/*            onChange={handleInput('newPassword')}*/}
            {/*            required*/}
            {/*            type='password'*/}
            {/*            value={passwords.newPassword}*/}
            {/*        />*/}
            {/*        <FormControl*/}
            {/*            label='Confirm new password'*/}
            {/*            maxLength={60}*/}
            {/*            minLength={3}*/}
            {/*            onChange={handleInput('confirmNewPassword')}*/}
            {/*            required*/}
            {/*            type='password'*/}
            {/*            value={passwords.confirmNewPassword}*/}
            {/*        />*/}
            {/*        <Button*/}
            {/*            style={{width: '100%'}}*/}
            {/*            type='submit'*/}
            {/*        >*/}
            {/*            {flags.changed ? 'Password changed!' : 'Change password'}*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    );
};

export default UserChangePassword;
