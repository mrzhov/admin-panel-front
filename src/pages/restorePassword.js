import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';

import useUserApi from '../api/authApi';
import {CLOSE_RESTORE_PASSWORD} from "../redux/actionTypes/commonFlags";
import useLegacyState from "../hooks/useLegacyState";
import Button from '../components/Button';
import Input from '../components/Input';
import logo from "../image/logo.svg";

const inputStyle = {
    margin: '0 0 15px 0'
};

const RestorePasswordPage = (props) => {
    const userApi = useUserApi();

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
                userApi.resetPassword({email: data.email, ...passwords})
            } else {
                if (flags.showCode) {
                    const cb = () => {
                        setFlags({showNewPassword: true})
                    };
                    userApi.checkResetKey(data, cb);
                } else {
                    const cb = () => {
                        setFlags({showCode: true})
                    };
                    userApi.checkEmail(data, cb);
                }
            }
        },
        [data, passwords]
    );

    const getDataFields = () => (
        <>
            <div style={inputStyle}>
                <Input
                    label='Email'
                    required
                    value={data.email}
                    onChange={handleInput('email')}
                />
            </div>
            {flags.showCode && (
                <div style={inputStyle}>
                    <Input
                        label='Confirmation code'
                        required
                        value={data.code}
                        onChange={handleInput('code')}
                    />
                </div>
            )}
        </>
    )

    const getPasswordsFields = () => (
        <>
            <div style={inputStyle}>
                <Input
                    label='New password'
                    type='password'
                    required
                    value={passwords.newPassword}
                    onChange={handleInput('newPassword')}
                />
            </div>
            <div style={inputStyle}>
                <Input
                    label='Confirm new password'
                    type='password'
                    required
                    value={passwords.confirmNewPassword}
                    onChange={handleInput('confirmNewPassword')}
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
                    className='secondary'
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
