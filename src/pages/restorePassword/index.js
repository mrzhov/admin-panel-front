import React, { useCallback } from 'react';
import useLegacyState from "../../hooks/useLegacyState";
import Button from '../../components/Button';
import logo from "../../image/logo.svg";
import useUserApi from "../../api/userApi";
import FormControl from "../../components/FormControl";

const RestorePasswordPage = () => {
    const userApi = useUserApi();

    const [data, setData] = useLegacyState({ email: '', code: '' });
    const [passwords, setPasswords] = useLegacyState({ newPassword: '', confirmNewPassword: '' });
    const [flags, setFlags] = useLegacyState({ showCode: false, showNewPassword: false });

    const handleInput = useCallback(name => e => {
        Object.keys(data).includes(name)
            ? setData({ [name]: e.target.value })
            : setPasswords({ [name]: e.target.value });
    }, [data]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        if (flags.showNewPassword) {
            userApi.resetPassword({ email: data.email, ...passwords })
        } else {
            flags.showCode
                ? userApi.checkResetKey(data, () => setFlags({ showNewPassword: true }))
                : userApi.checkEmail(data, () => setFlags({ showCode: true }));
        }
    }, [data, passwords]);

    const dataFieldsTemplate = () => (
        <>
            <FormControl
                label='Email'
                className='formItem'
                type='text'
                placeholder='Email'
                required
                value={data.email}
                onChange={handleInput('email')}
            />
            {flags.showCode && (
                <FormControl
                    label='Confirmation code'
                    className='formItem'
                    type='text'
                    placeholder='Confirmation code'
                    required
                    value={data.code}
                    onChange={handleInput('code')}
                />
            )}
        </>
    )
    const passwordsFieldsTemplate = () => (
        <>
            <FormControl
                label='New password'
                className='formItem'
                type='password'
                placeholder='New password'
                required
                value={passwords.newPassword}
                onChange={handleInput('newPassword')}
            />
            <FormControl
                label='Confirm new password'
                className='formItem'
                type='password'
                placeholder='Confirm new password'
                required
                value={passwords.confirmNewPassword}
                onChange={handleInput('confirmNewPassword')}
            />
        </>
    )

    return (
        <div className='loginPage'>
            <div className='loginPage__wrapper'>
                <div className='loginPage__logo'>
                    <img src={logo} alt="Logo"/>
                </div>
                <form className='loginPage__form' onSubmit={handleSubmit}>
                    {!flags.showNewPassword && dataFieldsTemplate()}
                    {flags.showNewPassword && passwordsFieldsTemplate()}
                    <Button type='submit' variant='large'>
                        {flags.showNewPassword
                            ? 'Change Password'
                            : flags.showCode
                                ? 'Send confirmation code'
                                : 'Send email'
                        }
                    </Button>
                </form>
                <Button
                    className='secondary'
                    variant='large'
                    onClick={userApi.openAuthorizationPage}
                >
                    Back to login
                </Button>
            </div>
        </div>
    );
}

export default RestorePasswordPage;
