import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import '../scss/pages/authorization.scss'

import { login } from '../api/authApi';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from "../image/logo.svg";
import { OPEN_RESTORE_PASSWORD } from "../redux/actions/commonFlags";

const AuthorizationPage = props => {
    const [form, setForm] = useState({ email: '', password: '' });
    const handleChange = name => event => {
        setForm({
            ...form,
            [name]: event.target.value
        });
    };
    const handleSubmit = event => {
        event.preventDefault();
        props.login(form, () =>
            props.history.push('/admin/users/me')
        );
    }
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
                    <Input
                        label='Email'
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                    />
                    <div style={{ margin: '15px 0' }}>
                        <Input
                            label='Password'
                            type='password'
                            required
                            value={form.password}
                            onChange={handleChange('password')}
                        />
                    </div>
                    <Button
                        type='submit'
                        variant='large'
                    >
                        Sign in
                    </Button>
                </form>
                <Button
                    variant='large'
                    onClick={props.goToRestorePasswordPage}
                >
                    Forgot you password?
                </Button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    login: (...args) => dispatch(login(...args)),
    goToRestorePasswordPage: () => {
        dispatch({ type: OPEN_RESTORE_PASSWORD });
    }
});

export default connect(null, mapDispatchToProps)(AuthorizationPage);
