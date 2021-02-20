import React, { useCallback, useEffect } from 'react';

import useUsersApi from '../api/usersApi';
import useLegacyState from '../hooks/useLegacyState';
import { useSelector } from "react-redux";
import { ADMIN, AGENT, SUB_AGENT } from "../lib/_variables";
import Checkbox from '../components/Checkbox'
import FormControl from "../components/FormControl";
import { getTitlePage, getFormActions } from "../lib/templates";
import routes from "../route/routes";

const userInitState = {
    role: '',
    email: '',
    name: '',
    minBalance: -100,
    initDiscount: 0,
    isSuper: false
};

const UserPage = ({ history, match }) => {
    const usersApi = useUsersApi();
    const [user, setUser] = useLegacyState(userInitState);
    const { id } = match.params;
    const authUserRole = useSelector(state => state.authUser.role);

    useEffect(() => {
        if (id && id !== 'new') {
            usersApi.getUser(id, ({ data }) => {
                data.role = { value: data.role, label: data.role };
                setUser(data);
            });
        }
    }, [id]);

    const handleSelect = useCallback(option => {
        setUser({
            role: option,
            isSuper: option.value === 'Admin'
        });
    }, [user])

    const handleInput = useCallback(name => e => {
        setUser({ [name]: e.target.value });
    }, [user]);

    const handleCheck = useCallback(() => {
        setUser({ isSuper: !user.isSuper });
    }, [user.isSuper]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.usersPage.path);
        const body = { ...user, role: user.role.value };
        id && id !== 'new'
            ? usersApi.updateUser(body, id, cb)
            : usersApi.createUser(body, cb);
    }, [user]);

    const getRoles = () => {
        switch (authUserRole) {
            case ADMIN:
                return [
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Agent', label: 'Agent' },
                    { value: 'Sub-Agent', label: 'Sub-Agent' }
                ];
            case AGENT:
                return [
                    { value: 'Sub-Agent', label: 'Sub-Agent' }
                ];
            case SUB_AGENT:
                return [];
            default:
                break;
        }
    };
    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper mainPage__center'>
                <div className='formContainer'>
                    <div className="form">
                        <div className='form__title'>
                            {getTitlePage(id, 'agent')}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                label='Select'
                                className='formItem'
                                placeholder='Role'
                                required
                                value={user.role}
                                onChange={handleSelect}
                                select
                                options={getRoles()}
                            />
                            <FormControl
                                label='Name'
                                className='formItem'
                                required
                                value={user.name}
                                onChange={handleInput('name')}
                                minLength={3}
                                maxLength={60}
                            />
                            <FormControl
                                label='Email'
                                className='formItem'
                                type='email'
                                required
                                value={user.email}
                                onChange={handleInput('email')}
                                minLength={3}
                                maxLength={60}
                            />
                            <FormControl
                                label='Initial Coupon Discount %'
                                className='formItem'
                                type='number'
                                step='1'
                                min='0'
                                max='100'
                                required
                                value={user.initDiscount}
                                onChange={handleInput('initDiscount')}
                            />
                            <FormControl
                                label='Min Balance $'
                                className='formItem'
                                type='number'
                                step='1'
                                min='-10000'
                                required
                                value={user.minBalance}
                                onChange={handleInput('minBalance')}
                            />
                            {authUserRole === ADMIN && (
                                <Checkbox
                                    label='SuperAgent'
                                    onChange={handleCheck}
                                    value={user.isSuper}
                                    disabled={user.role.value !== 'Agent'}
                                    className={user.role.value === 'Agent' && 'checkbox_active'}
                                />
                            )}
                            {getFormActions(id, history)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
