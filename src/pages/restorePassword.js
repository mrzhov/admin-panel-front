import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';

import Button from '../components/button';

import Input from '../components/Input';
import {CLOSE_RESTORE_PASSWORD} from "../redux/actions/commonFlags";
import useUsersApi from "../api/usersApi";
import useLegacyState from "../hooks/useLegacyState";
import logo from "../image/logo.svg";

const inputStyle = {
    margin: '0 0 15px 0'
};

const RestorePasswordPage = (props) => {
    const usersApi = useUsersApi();

    const [data, setData] = useLegacyState({
        email: '',
        code: ''
    });
    const [passwords, setPasswords] = useLegacyState({
        newPassword: '',
        confirmNewPassword: '',
    });

    const [flags, setFlags] = useState({
        showCode: false,
        showNewPassword: false
    });

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            Object.keys(data).includes(name)
                ? setData({[name]: value})
                : setPasswords({[name]: value});
        },
        [data]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            if (flags.showNewPassword) {
                usersApi.resetPassword({email: data.email, ...passwords})
            } else {
                if (flags.showCode) {
                    const cb = () => {
                        setFlags({showNewPassword: true})
                    };
                    usersApi.checkResetKey(data, cb);
                } else {
                    const cb = () => {
                        setFlags({showCode: true})
                    };
                    usersApi.checkEmail(data, cb);
                }
            }
        },
        [data, passwords]
    );

    const getDataFields = () => (
        <>
            <div style={inputStyle}>
                <Input
                    inputProps={{
                        onChange: handleInput('email'),
                        value: data.email,
                        required: true
                    }}
                    label='Email'
                />
            </div>
            {flags.showCode && (
                <div style={inputStyle}>
                    <Input
                        inputProps={{
                            onChange: handleInput('code'),
                            value: data.code,
                            required: true
                        }}
                        label='Confirmation code'
                    />
                </div>
            )}
        </>
    )

    const getPasswordsFields = () => (
        <>
            <div style={inputStyle}>
                <Input
                    inputProps={{
                        onChange: handleInput('newPassword'),
                        value: passwords.newPassword,
                        required: true
                    }}
                    label='New password'
                    type='password'
                />
            </div>
            <div style={inputStyle}>
                <Input
                    inputProps={{
                        onChange: handleInput('confirmNewPassword'),
                        value: passwords.confirmNewPassword,
                        required: true
                    }}
                    label='Confirm new password'
                    type='password'
                />
            </div>
        </>
    )

    return (
        <div className='loginPage'>
            <div className='loginPage__wrapper'>
                <div className='loginPage__logo'>
                    <img src={logo} alt="Logo"/>
                </div>
                <form
                    className='loginPage__form'
                    onSubmit={handleSubmit}
                >
                    {!flags.showNewPassword && getDataFields()}
                    {flags.showNewPassword && getPasswordsFields()}
                    <Button
                        type='submit'
                        variant='large'
                    >
                        {flags.showNewPassword
                            ? 'Change Password'
                            : flags.showCode
                                ? 'Send confirmation code'
                                : 'Send email'
                        }
                    </Button>
                </form>
                <Button
                    variant='large'
                    onClick={props.goToAuthPage}
                >
                    Back to login
                </Button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    goToAuthPage: () => {
        dispatch({
            type: CLOSE_RESTORE_PASSWORD
        });
    }
});

export default connect(null, mapDispatchToProps)(RestorePasswordPage);
