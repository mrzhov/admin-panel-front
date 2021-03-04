import React, { useCallback } from 'react';
import useUserApi from '../../api/userApi';
import Button from '../../components/Button';
import FormControl from "../../components/FormControl";
import logo from "../../image/logo.svg";
import useLegacyState from "../../hooks/useLegacyState";

import './index.scss'

const AuthorizationPage = ({ history }) => {
    const userApi = useUserApi();
    const [form, setForm] = useLegacyState({ email: '', password: '' });

    const handleInput = useCallback(name => e => {
        setForm({ [name]: e.target.value });
    }, [form]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        userApi.login(form, () => history.push('/users/me'));
    }, [form]);

    return (
        <div className='loginPage'>
            <div className='loginPage__wrapper'>
                <div className='loginPage__logo'>
                    <img src={logo} alt="Logo"/>
                </div>
                <form className='loginPage__form' onSubmit={handleSubmit}>
                    <FormControl
                        label='Email'
                        className='formItem'
                        type='text'
                        placeholder='Email'
                        required
                        value={form.email}
                        onChange={handleInput('email')}
                    />
                    <FormControl
                        label='Password'
                        className='formItem'
                        type='password'
                        required
                        value={form.password}
                        onChange={handleInput('password')}
                    />
                    <Button type='submit' variant='large'>Sign in</Button>
                </form>
                <Button
                    className='secondary'
                    variant='large'
                    onClick={userApi.openRestorePasswordPage}
                >
                    Forgot you password?
                </Button>
            </div>
        </div>
    );
}

export default AuthorizationPage;
