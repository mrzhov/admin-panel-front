import React, { useCallback, useEffect } from 'react';
import { useSelector } from "react-redux";
import useAgentsApi from '../../api/agentsApi';
import useLegacyState from '../../hooks/useLegacyState';
import { ADMIN, AGENT, SUB_AGENT } from "../../lib/_variables";
import Checkbox from '../../components/Checkbox'
import FormControl from "../../components/FormControl";
import { getTitlePage, getFormActions } from "../../lib/templates";
import routes from "../../route/routes";

const agentInitState = {
    role: '',
    email: '',
    name: '',
    minBalance: -100,
    initDiscount: 0,
    isSuper: false
};

const AgentPage = ({ history, match }) => {
    const agentsApi = useAgentsApi();
    const [agent, setAgent] = useLegacyState(agentInitState);
    const { id } = match.params;
    const userRole = useSelector(state => state.user.role);

    useEffect(() => {
        if (id && id !== 'new') {
            agentsApi.getAgent(id, ({ data }) => {
                const agent = { ...data }
                agent.role = { value: data.role, label: data.role };
                setAgent(agent);
            });
        }
    }, [id]);

    const handleSelect = useCallback(option => {
        setAgent({ role: option, isSuper: option.value === 'Admin' });
    }, [agent])

    const handleInput = useCallback(name => e => {
        setAgent({ [name]: e.target.value });
    }, [agent]);

    const handleCheck = useCallback(() => {
        setAgent({ isSuper: !agent.isSuper });
    }, [agent.isSuper]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.agentsPage.path);
        const body = { ...agent, role: agent.role.value };
        id && id !== 'new'
            ? agentsApi.updateAgent(body, id, cb)
            : agentsApi.createAgent(body, cb);
    }, [agent]);

    const getRoles = () => {
        switch (userRole) {
            case ADMIN:
                return [
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Agent', label: 'Agent' },
                    { value: 'Sub-Agent', label: 'Sub-Agent' }
                ];
            case AGENT:
                return [{ value: 'Sub-Agent', label: 'Sub-Agent' }];
            case SUB_AGENT:
                return [];
            default:
                return [];
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
                                value={agent.role}
                                onChange={handleSelect}
                                select
                                options={getRoles()}
                            />
                            <FormControl
                                label='Name'
                                className='formItem'
                                required
                                value={agent.name}
                                onChange={handleInput('name')}
                                minLength={3}
                                maxLength={60}
                            />
                            <FormControl
                                label='Email'
                                className='formItem'
                                type='email'
                                required
                                value={agent.email}
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
                                value={agent.initDiscount}
                                onChange={handleInput('initDiscount')}
                            />
                            <FormControl
                                label='Min Balance $'
                                className='formItem'
                                type='number'
                                step='1'
                                min='-10000'
                                required
                                value={agent.minBalance}
                                onChange={handleInput('minBalance')}
                            />
                            {userRole === ADMIN && (
                                <Checkbox
                                    label='SuperAgent'
                                    onChange={handleCheck}
                                    value={agent.isSuper}
                                    disabled={agent.role.value !== 'Agent'}
                                    className={agent.role.value === 'Agent' && 'checkbox_active'}
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

export default AgentPage;
