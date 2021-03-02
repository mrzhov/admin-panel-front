import React, { useState, useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';
import useUsers from '../api/usersApi';
import FormControl from '../components/FormControl';
import useLegacyState from '../hooks/useLegacyState';
import routes from '../route/routes';
import Checkbox from "../components/Checkbox";
import usePromotions from "../api/promotionsApi";
import { getFormActions, getTitlePage } from "../lib/templates";

const promoInitState = {
    name: '',
    duration: '',
    discount: '',
    type: '',
    users: []
};

const Promo = ({ history, match }) => {
    const usersApi = useUsers();
    const promoApi = usePromotions();

    const [promo, setPromo] = useLegacyState(promoInitState);
    const [checkAll, setCheckAll] = useState(false);

    const users = useSelector(state => state.users.list);
    const { id } = match.params;

    useEffect(() => {
        getUsers();
    }, [id]);

    useEffect(() => {
        if (id && id !== 'new') {
            getPromo();
        } else {
            const initUsers = users.filter(el => !el.promo).map(user => ({ id: user._id, value: false }))
            setPromo({ users: initUsers })
        }
    }, [users])

    const getUsers = useCallback(() => {
        usersApi.getUsers({ id });
    }, [id]);

    const getPromo = useCallback(() => {
        if (users.length) {
            const cb = ({ data }) => {
                const newPromo = { ...data };
                const initUsers =
                    users.filter(el => !el.promo || el.promo === id)
                        .map(user => ({ id: user._id, value: false }))
                newPromo.users = initUsers.map(el => {
                    if (data.users.includes(el.id)) {
                        el.value = true
                    }
                    return el
                });
                newPromo.type = { label: data.type, value: data.type };
                setPromo(newPromo)
                if (newPromo.users.every(el => el.value)) {
                    setCheckAll(true)
                }
            }
            promoApi.getPromo(id, cb);
        }
    }, [users]);

    const handleSelect = useCallback(type => {
        setPromo({ type });
    }, [promo])

    const handleInput = useCallback(name => e => {
        setPromo({ [name]: e.target.value })
    }, [promo]);

    const handleCheck = useCallback(id => e => {
        if (id === "checkAll") {
            const newUsersArr = promo.users.map(el => {
                el.value = !checkAll;
                return el
            });
            setPromo({ users: newUsersArr });
            setCheckAll(!checkAll);
        } else {
            const newUsersArr = promo.users.map(el => {
                if (el.id === id) el.value = !el.value;
                return el
            });
            setPromo({ users: newUsersArr });
            setCheckAll(promo.users.every(el => el.value));
        }
    }, [promo]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.promotionsPage.path);
        const body = {
            ...promo,
            type: promo.type.value,
            users: promo.users.filter(el => el.value).map(el => el.id)
        };
        id && id !== 'new'
            ? promoApi.updatePromo(body, id, cb)
            : promoApi.createPromo(body, cb);
    }, [promo]);

    const getTypesOptions = () => [
        { label: 'Fixed', value: 'Fixed' },
        { label: 'Additional', value: 'Additional' }
    ]

    const getCheckboxValue = id => {
        const user = promo.users.find(el => el.id === id);
        if (user) {
            return user.value
        }
    }
    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper mainPage__center'>
                <div className='formContainer'>
                    <div className="form">
                        <div className='form__title'>
                            {getTitlePage(id, 'promo')}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                label='Name'
                                className='formItem'
                                type='string'
                                required
                                value={promo.name}
                                onChange={handleInput('name')}
                            />
                            <FormControl
                                label='Type'
                                className='formItem'
                                placeholder='Type'
                                required
                                value={promo.type}
                                onChange={handleSelect}
                                select
                                options={getTypesOptions()}
                            />
                            <FormControl
                                label='Durations (days)'
                                className='formItem'
                                type='number'
                                step='1'
                                min='1'
                                required
                                value={promo.duration}
                                onChange={handleInput('duration')}
                            />
                            <FormControl
                                label='Discount (%)'
                                className='formItem'
                                type='number'
                                step='1'
                                min='1'
                                max='100'
                                required
                                value={promo.discount}
                                onChange={handleInput('discount')}
                            />
                            <div className="form__checkboxes">
                                <div className='form__subtitle'>
                                    <h6>Agents:</h6>
                                </div>
                                {users && (
                                    <div className='checkboxContainer'>
                                        {
                                            id && id === 'new' &&
                                            users.filter(el => !el.promo).map(user => (
                                                <Checkbox
                                                    className='checkbox_active'
                                                    label={user.name}
                                                    onChange={handleCheck(user._id)}
                                                    value={getCheckboxValue(user._id)}
                                                    key={user._id}
                                                />
                                            ))
                                        }
                                        {
                                            id && id !== 'new' &&
                                            users.filter(el => !el.promo || el.promo === id).map(user => (
                                                <Checkbox
                                                    className='checkbox_active'
                                                    label={user.name}
                                                    onChange={handleCheck(user._id)}
                                                    value={getCheckboxValue(user._id)}
                                                    key={user._id}
                                                />
                                            ))
                                        }
                                    </div>
                                )}
                                {promo.users.length && (
                                    <div className='checkboxContainer checkboxContainer_allCheckbox'>
                                        <Checkbox
                                            className='checkbox_active'
                                            label='Select all'
                                            onChange={handleCheck('checkAll')}
                                            value={checkAll}
                                        />
                                    </div>
                                )}
                            </div>
                            {getFormActions(id, history)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promo;
