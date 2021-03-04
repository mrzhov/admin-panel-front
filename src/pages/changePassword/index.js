import React, { useCallback } from 'react';
import useUserApi from '../../api/userApi';
import useLegacyState from '../../hooks/useLegacyState';
import FormControl from "../../components/FormControl";
import routes from "../../route/routes";
import { getFormActions } from "../../lib/templates";

const passwordsInitState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const ChangePasswordPage = ({ match, history }) => {
    const userApi = useUserApi();

    const [passwords, setPasswords] = useLegacyState(passwordsInitState);
    const { id } = match.params;

    const handleInput = useCallback(name => e => {
        setPasswords({ [name]: e.target.value });
    }, [passwords]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.agentsPage.path);
        userApi.changePassword(passwords, cb);
    }, [passwords]);

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
                                className='formItem'
                                type='password'
                                min='6'
                                max='60'
                                required
                                value={passwords.oldPassword}
                                onChange={handleInput('oldPassword')}
                            />
                            <FormControl
                                label='New password'
                                className='formItem'
                                type='password'
                                min='6'
                                max='60'
                                required
                                value={passwords.newPassword}
                                onChange={handleInput('newPassword')}
                            />
                            <FormControl
                                label='Confirm new password'
                                className='formItem'
                                type='password'
                                min='6'
                                max='60'
                                required
                                value={passwords.confirmNewPassword}
                                onChange={handleInput('confirmNewPassword')}
                            />
                            {getFormActions(id, history)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
