import React, { useCallback, useEffect } from 'react';
import FormControl from '../../components/FormControl';
import useWalletsApi from '../../api/walletsApi';
import useLegacyState from '../../hooks/useLegacyState';
import routes from '../../route/routes';
import { getFormActions, getTitlePage } from "../../lib/templates";

const walletInitState = {
    name: '',
    address: '',
    description: '',
};

const WalletPage = ({ history, match }) => {
    const walletsApi = useWalletsApi();
    const [wallet, setWallet] = useLegacyState(walletInitState);
    const { id } = match.params;

    useEffect(() => {
        if (id && id !== 'new') {
            walletsApi.getWallet(id, ({ data }) => setWallet(data));
        }
    }, [id]);

    const handleInput = useCallback(name => e => {
        setWallet({ [name]: e.target.value });
    }, [wallet]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.walletsPage.path);
        id && id !== 'new'
            ? walletsApi.updateWallet(wallet, id, cb)
            : walletsApi.createWallet(wallet, cb);
    }, [wallet]);

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper mainPage__center'>
                <div className='formContainer'>
                    <div className="form">
                        <div className='form__title'>
                            {getTitlePage(id, 'wallet')}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                label='Name'
                                className='formItem'
                                min='1'
                                max='60'
                                required
                                value={wallet.name}
                                onChange={handleInput('name')}
                            />
                            <FormControl
                                label='Address'
                                className='formItem'
                                min='1'
                                required
                                value={wallet.address}
                                onChange={handleInput('address')}
                            />
                            <FormControl
                                label='Description'
                                className='formItem'
                                min='1'
                                required
                                value={wallet.description}
                                onChange={handleInput('description')}
                            />
                            {getFormActions(id, history)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
