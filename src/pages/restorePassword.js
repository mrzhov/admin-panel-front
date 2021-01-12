import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';

import Button from '../components/button';

import Input from '../components/Input';
import {CLOSE_RESTORE_PASSWORD} from "../redux/reducers/commonFlags";
import useUsersApi from "../api/usersApi";
import useLegacyState from "../hooks/useLegacyState";
import logo from "../image/logo.svg";

const RestorePasswordPage = (props) => {
    const usersApi = useUsersApi();

    const [data, setData] = useLegacyState({
        email: '',
        code: ''
    });

    const [flags, setFlags] = useState({
        showCode: false,
        showNewPassword: false
    });
    const [passwords, setPasswords] = useLegacyState({
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            setData({[name]: value});
        },
        [data]
    );

    const handlePasswordInput = useCallback(
        name => e => {
            const {value} = e.target;

            setPasswords({[name]: value});
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
                    usersApi.restorePassword(data, cb);
                }
            }
        },
        [data, passwords]
    );

    return (
        <div className='login-container'>
            <div className='logoContainer'>
                <img src={logo} alt="Logo"/>
            </div>
            <form
                className='login-form'
                onSubmit={handleSubmit}
            >
                {!flags.showNewPassword && (
                    <>
                        <div style={{margin: '0 0 15px 0'}}>
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
                            <div style={{margin: '0 0 15px 0'}}>
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
                )}
                {flags.showNewPassword && (
                    <>
                        <div style={{margin: '0 0 15px 0'}}>
                            <Input
                                inputProps={{
                                    onChange: handlePasswordInput('newPassword'),
                                    value: passwords.newPassword,
                                    required: true
                                }}
                                label='New password'
                                type='password'
                            />
                        </div>
                        <div style={{margin: '0 0 15px 0'}}>
                            <Input
                                inputProps={{
                                    onChange: handlePasswordInput('confirmNewPassword'),
                                    value: passwords.confirmNewPassword,
                                    required: true
                                }}
                                label='Confirm new password'
                                type='password'
                            />
                        </div>
                    </>
                )}
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
                <Button
                    type='button'
                    variant='large'
                    onClick={props.goToAuthPage}
                >
                    Back to login
                </Button>
            </form>
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
