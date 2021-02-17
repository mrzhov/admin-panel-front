import React, {useCallback, useEffect} from 'react';
import { Link } from "react-router-dom";

import Button from '../components/Button';
import FormControl from '../components/FormControl';

import useWallet from '../api/walletsApi';
import useLegacyState from '../hooks/useLegacyState';
import routes from '../route/routes';
import { getTitlePage } from '../lib/functions';

const initialState = {
    name: '',
    address: '',
    description: '',
};

const Wallet = ({history, match}) => {
    const walletsApi = useWallet();

    const [wallet, setWallet] = useLegacyState(initialState);

    const {id} = match.params;

    useEffect(() => {
        if (id && id !== 'new') {
            walletsApi.getWallet(id, ({data}) => setWallet(data));
        }
    }, [id]);

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            setWallet({[name]: value});
        },
        [wallet]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            const cb = () => history.push(routes.walletsPage.path);

            if (id && id !== 'new') {
                walletsApi.updateWallet(wallet, id, cb);
            } else {
                walletsApi.createWallet(wallet, cb);
            }
        },
        [wallet]
    );

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
                                className='formItem'
                                label='Name'
                                min='0'
                                onChange={handleInput('name')}
                                required
                                step='1'
                                value={wallet.name}
                            />
                            <FormControl
                                className='formItem'
                                label='Address'
                                min='0'
                                onChange={handleInput('address')}
                                required
                                step='1'
                                value={wallet.address}
                            />
                            <FormControl
                                className='formItem'
                                label='Description'
                                min='0'
                                onChange={handleInput('description')}
                                required
                                step='1'
                                value={wallet.description}
                            />
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
