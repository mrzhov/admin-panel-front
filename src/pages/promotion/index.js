import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAgentsApi from '../../api/agentsApi';
import FormControl from '../../components/FormControl';
import useLegacyState from '../../hooks/useLegacyState';
import routes from '../../route/routes';
import Checkbox from "../../components/Checkbox";
import usePromotionsApi from "../../api/promotionsApi";
import { getFormActions, getTitlePage } from "../../lib/templates";

const promoInitState = {
    name: '',
    duration: '',
    discount: '',
    type: '',
    agents: []
};

const PromotionPage = ({ history, match }) => {
    const agentsApi = useAgentsApi();
    const promotionsApi = usePromotionsApi();

    const [promo, setPromo] = useLegacyState(promoInitState);
    const [checkAll, setCheckAll] = useState(false);

    const agents = useSelector(state => state.agents.list);
    const { id } = match.params;

    useEffect(() => {
        getUsers();
    }, [id]);

    useEffect(() => {
        if (id && id !== 'new') {
            getPromo();
        } else {
            const initAgents = agents.filter(el => !el.promo).map(agent => ({ id: agent._id, value: false }))
            setPromo({ agents: initAgents })
        }
    }, [agents])

    const getUsers = useCallback(() => {
        agentsApi.getAgents({ id });
    }, [id]);

    const getPromo = useCallback(() => {
        if (agents.length) {
            const cb = ({ data }) => {
                const newPromo = { ...data };
                const initAgents =
                    agents.filter(el => !el.promo || el.promo === id)
                        .map(agent => ({ id: agent._id, value: false }))
                newPromo.agents = initAgents.map(el => {
                    if (data.agents.includes(el.id)) {
                        el.value = true
                    }
                    return el
                });
                newPromo.type = { label: data.type, value: data.type };
                setPromo(newPromo)
                if (newPromo.agents.every(el => el.value)) {
                    setCheckAll(true)
                }
            }
            promotionsApi.getPromo(id, cb);
        }
    }, [agents]);

    const handleSelect = useCallback(type => {
        setPromo({ type });
    }, [promo])

    const handleInput = useCallback(name => e => {
        setPromo({ [name]: e.target.value })
    }, [promo]);

    const handleCheck = useCallback(id => e => {
        if (id === "checkAll") {
            const newAgentsArr = promo.agents.map(el => {
                el.value = !checkAll;
                return el
            });
            setPromo({ users: newAgentsArr });
            setCheckAll(!checkAll);
        } else {
            const newAgentsArr = promo.agents.map(el => {
                if (el.id === id) el.value = !el.value;
                return el
            });
            setPromo({ agents: newAgentsArr });
            setCheckAll(promo.agents.every(el => el.value));
        }
    }, [promo]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.promotionsPage.path);
        const body = {
            ...promo,
            type: promo.type.value,
            agents: promo.agents.filter(el => el.value).map(el => el.id)
        };
        id && id !== 'new'
            ? promotionsApi.updatePromo(body, id, cb)
            : promotionsApi.createPromo(body, cb);
    }, [promo]);

    const getTypesOptions = () => [
        { label: 'Fixed', value: 'Fixed' },
        { label: 'Additional', value: 'Additional' }
    ]

    const getCheckboxValue = id => {
        const agent = promo.agents.find(el => el.id === id);
        if (agent) {
            return agent.value
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
                                {agents && (
                                    <div className='checkboxContainer'>
                                        {
                                            id && id === 'new' &&
                                            agents.filter(el => !el.promo).map(agent => (
                                                <Checkbox
                                                    className='checkbox_active'
                                                    label={agent.name}
                                                    onChange={handleCheck(agent._id)}
                                                    value={getCheckboxValue(agent._id)}
                                                    key={agent._id}
                                                />
                                            ))
                                        }
                                        {
                                            id && id !== 'new' &&
                                            agents.filter(el => !el.promo || el.promo === id).map(agent => (
                                                <Checkbox
                                                    className='checkbox_active'
                                                    label={agent.name}
                                                    onChange={handleCheck(agent._id)}
                                                    value={getCheckboxValue(agent._id)}
                                                    key={agent._id}
                                                />
                                            ))
                                        }
                                    </div>
                                )}
                                {promo.agents.length && (
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

export default PromotionPage;
