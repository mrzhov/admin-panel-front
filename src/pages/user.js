import React, {useCallback, useEffect} from 'react';

import useUsersApi from '../api/usersApi';
import Button from '../components/button';
import FormControl from '../components/FormControl';
import useLegacyState from '../hooks/useLegacyState';
import routes from '../route/routes';
import Checkbox from '../components/checkbox';
import {useSelector} from "react-redux";
import {ADMIN, AGENT, SUB_AGENT} from "../lib/_variables";

const initialState = {
    id: '',
    name: '',
    role: '',
    balance: '',
    minBalance: -100,
    initDiscount: 0,
    isSuper: false
};

const UserPage = ({history, match}) => {
    // const usersApi = useUserApi();

    const [user, setUser] = useLegacyState(initialState);
    // const user = useSelector(state => state.user);
    const {id} = match.params;
    const usersApi = useUsersApi();

    const authUserRole = useSelector(state => state.user.role)

    useEffect(() => {
        if (id && id !== 'new') {
            usersApi.getUser(id, data => {
                setUser(data)
            });
        }
    }, [id]);


    // const getRoles = [
    //     {value: 'Admin', label: 'Admin'},
    //     {value: 'Agent', label: 'Agent'},
    //     {value: 'Sub-Agent', label: 'Sub-Agent'}
    //   ]

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

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            setUser({[name]: value});
        },
        [user]
    );

    const handleSelect = useCallback(name => value => {
        setUser({[name]: value});

        value === 'Admin'
            ? setUser({isSuper: true})
            : setUser({isSuper: false})
    }, [user])

    const handleCheck = useCallback(() => {
        setUser({isSuper: !user.isSuper});
    }, [user.isSuper]);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            const cb = () => history.push(routes.usersPage.path);

            if (id && id !== 'new') {
                usersApi.updateUser(user, id, cb);
            } else {
                usersApi.createUser(user, cb);
            }
        },
        [user]
    );

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Agent</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='page-block-half'>
                    <FormControl
                        label='Select'
                        onChange={handleSelect('role')}
                        options={getRoles()}
                        placeholder='Role'
                        required={id && id === 'new'}
                        select
                        value={user.role}
                    />
                    <FormControl
                        label='Email'
                        maxLength={60}
                        minLength={3}
                        onChange={handleInput('email')}
                        required
                        value={user.email}
                    />
                    <FormControl
                        label='Name'
                        maxLength={60}
                        minLength={3}
                        onChange={handleInput('name')}
                        required
                        value={user.name}
                    />
                    {id === 'new' && (
                        <FormControl
                            autoComplete='new-password'
                            label='Password'
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
                    <Button
                        style={{width: '100%'}}
                        type='submit'
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserPage;
