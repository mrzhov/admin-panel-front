import React, { useCallback, useEffect } from 'react';
import { useSelector } from "react-redux";
import FormControl from "../../components/FormControl";
import useDepositApi from '../../api/depositsApi';
import useAgentsApi from '../../api/agentsApi';
import useWalletsApi from '../../api/walletsApi';
import useLegacyState from "../../hooks/useLegacyState";
import { getFormActions, getTitlePage } from "../../lib/templates";
import routes from "../../route/routes";

const depositInitState = {
    name: '',
    amount: '',
    wallet: '',
    agent: '',
    creator: '',
    // file: null,
    // originalFileName: '',
};

const DepositPage = ({ history, match }) => {
    const depositsApi = useDepositApi();
    const agentsApi = useAgentsApi();
    const walletsApi = useWalletsApi();
    const { id } = match.params;

    const [deposit, setDeposit] = useLegacyState(depositInitState);

    const agents = useSelector(state => state.agents.list);
    const wallets = useSelector(state => state.wallets.list);
    const userId = useSelector(state => state.user.id)

    const getAgents = useCallback(() => {
        agentsApi.getAgents();
    }, [id]);

    const getWallets = useCallback(() => {
        walletsApi.getWallets();
    }, [id]);

    useEffect(() => {
        if (id && id !== 'new') {
            depositsApi.getDeposit(id, ({ data }) => setDeposit(data));
        }
        getAgents();
        getWallets()
    }, [id]);

    const handleInput = useCallback(name => e => {
        setDeposit({ [name]: e.target.value });
    }, [deposit]);

    const handleSelect = useCallback(name => value => {
        setDeposit({ [name]: value });
    }, [deposit]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.depositsPage.path);
        const body = { ...deposit, agent: deposit.agent.value, wallet: deposit.wallet.value, creator: userId };
        if (id && id !== 'new') {
            depositsApi.updateDeposit(body, id, cb);
            // submitWrapper('update');
        } else {
            depositsApi.createDeposit(body, cb)
            // submitWrapper('create');
        }
    }, [deposit]);

    // const submitWrapper = type => {
    //     if (!!deposit.file) {
    //         setLoadingFlags({loading: true, showSpinner: true})
    //         fileUpload(type);
    //     } else {
    //         fileUploadCb(type)
    //     }
    // }
    //
    // const fileUpload = typeCb => {
    //     Upload.upload(deposit.file, {
    //         url: '/attachments/upload',
    //         name: 'attachment',
    //         callback: (response, status) => {
    //             if (status === 200) {
    //                 fileUploadCb(typeCb, response);
    //             }
    //         }
    //     });
    // }
    //
    // const fileUploadCb = (typeCb, response) => {
    //     const cb = () => history.push(routes.depositsPage.path);
    //
    //     let fileBody = deposit;
    //     switch (typeCb) {
    //         case 'create':
    //             if (response) {
    //                 fileBody.fileId = response.data._id || '';
    //             }
    //             depositsApi.createDeposit(fileBody, cb);
    //             break;
    //         case 'update':
    //             if (response) {
    //                 fileBody.fileId = response.data._id || '';
    //             }
    //             depositsApi.updateDeposit(fileBody, id, cb);
    //             break;
    //         default:
    //             break;
    //     }
    // }
    //
    const getAgentOptions = () => (
        agents.map(a => ({
            label: `${a.name}`,
            value: a._id
        }))
    )
    const getWalletsOptions = () => (
        wallets.map(w => ({
            label: `${w.name}`,
            value: w._id
        }))
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper mainPage__center'>
                <div className='formContainer'>
                    <div className="form">
                        <div className='form__title'>
                            {getTitlePage(id, 'deposit')}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                label='Name'
                                className='formItem'
                                type='text'
                                required
                                value={deposit.name}
                                onChange={handleInput('name')}
                            />
                            <FormControl
                                label='Amount (USD)'
                                className='formItem'
                                type='number'
                                step='1'
                                min='1'
                                required
                                value={deposit.amount}
                                onChange={handleInput('amount')}
                            />
                            <FormControl
                                label='Wallet'
                                className='formItem'
                                placeholder='Wallet'
                                required
                                value={deposit.wallet}
                                onChange={handleSelect('wallet')}
                                select
                                options={getWalletsOptions()}
                            />
                            <FormControl
                                label='Agent'
                                className='formItem'
                                placeholder='Agent'
                                required
                                value={deposit.agent}
                                onChange={handleSelect('agent')}
                                select
                                options={getAgentOptions()}
                            />
                            {/*<FileUpload originalFileName={deposit.originalFileName} pageType={id} updateFile={file => setDeposit({ file })}/>*/}
                            {getFormActions(id, history)}
                        </form>
                        {/*{loadingFlags.loading && loadingFlags.showSpinner && (*/}
                        {/*    <div className='block-half-container'>*/}
                        {/*        <div className='spinner-container'>*/}
                        {/*            <Spinner/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
