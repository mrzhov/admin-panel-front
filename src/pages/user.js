import React, {useCallback, useEffect} from 'react';

import useUsersApi from '../api/usersApi';
import Button from '../components/Button';
import useLegacyState from '../hooks/useLegacyState';
import {useSelector} from "react-redux";
import {ADMIN, AGENT, SUB_AGENT} from "../lib/_variables";
import {Link} from "react-router-dom";
import Checkbox from '../components/Checkbox'
import FormControl from "../components/FormControl";
import routes from "../route/routes";
import {getTitlePage} from "../lib/functions";

const initialState = {
    role: '',
    email: '',
    name: '',
    minBalance: -100,
    initDiscount: 0,
    isSuper: false
};

const UserPage = ({history, match}) => {
    const [user, setUser] = useLegacyState(initialState);
    const {id} = match.params;
    const usersApi = useUsersApi();

    const authUserRole = useSelector(state => state.authUser.role)

    useEffect(() => {
        if (id && id !== 'new') {
            usersApi.getUser(id, data => {
                const {role, name, email, minBalance, initDiscount, isSuper} = data;
                setUser({
                    role: {value: role, label: role},
                    name,
                    email,
                    minBalance,
                    initDiscount,
                    isSuper
                })
            });
        }
    }, [id]);

    const getRoles = () => {
        switch (authUserRole) {
            case ADMIN:
                return [
                    {value: 'Admin', label: 'Admin'},
                    {value: 'Agent', label: 'Agent'},
                    {value: 'Sub-Agent', label: 'Sub-Agent'}
                ]
            case AGENT:
                return [
                    {value: 'Sub-Agent', label: 'Sub-Agent'}
                ]
            case SUB_AGENT:
                return []
        }
    }

    const handleSelect = useCallback(name => value => {
        setUser({[name]: value});

        value === 'Admin'
            ? setUser({isSuper: true})
            : setUser({isSuper: false})
    }, [user])

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            setUser({[name]: value});
        },
        [user]
    );

    const handleCheck = useCallback(() => {
        setUser({isSuper: !user.isSuper});
    }, [user.isSuper]);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            const cb = () => history.push(routes.usersPage.path);

            user.role = user.role.value;
            if (id && id !== 'new') {
                usersApi.updateUser(user, id, cb);
            } else {
                usersApi.createUser(user, cb);
            }
        },
        [user]
    );

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
                                className='formItem'
                                onChange={handleSelect('role')}
                                options={getRoles()}
                                placeholder='Role'
                                required
                                select
                                value={user.role}
                            />
                            <FormControl
                                label='Email'
                                className='formItem'
                                maxLength={60}
                                minLength={3}
                                onChange={handleInput('email')}
                                required
                                value={user.email}
                            />
                            <FormControl
                                label='Name'
                                className='formItem'
                                maxLength={60}
                                minLength={3}
                                onChange={handleInput('name')}
                                required
                                value={user.name}
                            />
                            {id === 'new' && (
                                <FormControl
                                    label='Password'
                                    className='formItem'
                                    maxLength={60}
                                    minLength={3}
                                    onChange={handleInput('password')}
                                    required
                                    type='password'
                                    value={user.password}
                                />
                            )}
                            <FormControl
                                label='Initial Coupon Discount %'
                                className='formItem'
                                max='100'
                                min='0'
                                onChange={handleInput('initDiscount')}
                                required
                                step='1'
                                type='number'
                                value={user.initDiscount}
                            />
                            <FormControl
                                label='Min Balance'
                                className='formItem'
                                onChange={handleInput('minBalance')}
                                required
                                min='-10000'
                                step='1'
                                type='number'
                                value={user.minBalance}
                            />
                            {authUserRole === ADMIN && (
                                <Checkbox
                                    label='SuperAgent'
                                    onChange={handleCheck}
                                    value={user.isSuper}
                                />
                            )}
                            <div className='form__actions'>
                                <Button
                                    type='submit'
                                    variant='small'
                                >
                                    {id && id === 'new' ? 'Create' : 'Save'}
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

export default UserPage;
