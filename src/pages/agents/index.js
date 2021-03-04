import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAgentsApi from '../../api/agentsApi';
import Button from '../../components/Button';
import { getQueryString } from '../../lib/functions';
import { agentsOptions } from '../../lib/tableOptions';
import routes from '../../route/routes';
import TableContainer from "../../components/TableContainer";

const AgentsPage = ({ history }) => {
    const agentsApi = useAgentsApi();
    const { page } = getQueryString();

    const agents = useSelector(state => state.agents.list);
    const totalAmount = useSelector(state => state.agents.totalAmount);
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    useEffect(() => {
        getAgents();
    }, [page, sortConfig]);

    const getAgents = useCallback(() => {
        agentsApi.getAgents({ page, ...sortConfig })
    }, [page, sortConfig]);

    const tableActionItems = item => (
        [
            {
                icon: 'info',
                tooltipText: 'Agent information',
                onClick: () => history.push(routes.agentInfoPage.path.replace(':id', item._id))
            },
            {
                icon: 'edit',
                tooltipText: 'Change agent information',
                onClick: () => history.push(routes.agentPage.path.replace(':id', item._id))
            },
            {
                icon: 'delete',
                tooltipText: 'Remove agent',
                onClick: () =>
                    window.confirm('Do you really want to delete the agent?') &&
                    agentsApi.deleteAgent(item._id, getAgents)
            }
        ]
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Agents</h3>
                    <Link to={routes.agentPage.path.replace(':id', 'new')}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <TableContainer
                    tableOptions={agentsOptions}
                    rows={agents}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default AgentsPage;
