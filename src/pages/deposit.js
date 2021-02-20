import React, { useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../components/Button";
import FormControl from "../components/FormControl";

import useDeposit from '../api/depositsApi';
import useUsers from '../api/usersApi';
import useWallets from '../api/walletsApi';
import useLegacyState from "../hooks/useLegacyState";
import { getTitlePage } from "../lib/templates";
import routes from "../route/routes";

const initialState = {
    name: '',
    amountUsd: '',
    amountCurrency: '',
    user: '',
    creator: '',
    wallet: '',
    // file: null,
    // originalFileName: '',
};

const Deposit = ({ history, match }) => {
    const depositsApi = useDeposit();
    const usersApi = useUsers();
    const walletsApi = useWallets();
    const { id } = match.params;

    const [deposit, setDeposit] = useLegacyState(initialState);

    const users = useSelector(state => state.users.list);
    const wallets = useSelector(state => state.wallets.list);
    const authUserId = useSelector(state => state.authUser.id)

    const getUsers = useCallback(() => {
        usersApi.getUsers();
    }, [id]);

    const getWallets = useCallback(() => {
        walletsApi.getWallets();
    }, [id]);

    useEffect(() => {
        if (id && id !== 'new') {
            depositsApi.getDeposit(id, ({ data }) => setDeposit(data));
        }

        getUsers();
        getWallets()
    }, [id]);

    const handleInput = useCallback(
        name => e => {
            const { value } = e.target;
            setDeposit({ [name]: value });
        },
        [deposit]
    );

    const handleSelect = useCallback(name => value => {
        setDeposit({ [name]: value });
    }, [deposit]);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            const cb = () => history.push(routes.depositsPage.path);

            deposit.user = deposit.user.value;
            deposit.wallet = deposit.wallet.value;
            deposit.creator = authUserId;
            if (id && id !== 'new') {
                depositsApi.updateDeposit(deposit, id, cb);
                // submitWrapper('update');
            } else {
                depositsApi.createDeposit(deposit, cb)
                // submitWrapper('create');
            }
        },
        [deposit]
    );

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
    function getUsersOptions() {
        return users.map(a => ({
            label: `${a.name}`,
            value: a._id
        }))
    }

    function getWalletsOptions() {
        return wallets.map(a => ({
            label: `${a.name}`,
            value: a._id
        }))
    }

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
                                className='formItem'
                                label='Name'
                                min='0'
                                onChange={handleInput('name')}
                                required
                                step='1'
                                type='string'
                                value={deposit.name}
                            />
                            <FormControl
                                className='formItem'
                                label='Amount (USD)'
                                onChange={handleInput('amountUsd')}
                                required
                                step='1'
                                type='number'
                                value={deposit.amountUsd}
                            />
                            <FormControl
                                className='formItem'
                                label='Currency amount'
                                min='0'
                                onChange={handleInput('amountCurrency')}
                                required
                                step='1'
                                type='number'
                                value={deposit.amountCurrency}
                            />
                            <FormControl
                                className='formItem'
                                label='Select'
                                onChange={handleSelect('wallet')}
                                options={getWalletsOptions()}
                                placeholder='Wallet'
                                required
                                select
                                value={deposit.wallet}
                            />
                            <FormControl
                                className='formItem'
                                label='Select'
                                onChange={handleSelect('user')}
                                options={getUsersOptions()}
                                placeholder='User'
                                required
                                select
                                value={deposit.user}
                            />

                            {/*<FileUpload originalFileName={deposit.originalFileName} pageType={id} updateFile={file => setDeposit({ file })}/>*/}

                            <div className='form__actions'>
                                <Button
                                    type='submit'
                                    variant='small'
                                >
                                    {id && id === 'new' ? 'Create' : 'Save'}
                                </Button>
                                <Button
                                    type='button'
                                    variant='small'
                                    className='secondary'
                                    onClick={history.goBack}
                                >
                                    Back
                                </Button>
                            </div>
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

export default Deposit;
