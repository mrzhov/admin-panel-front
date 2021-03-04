import React from 'react';
import { useSelector } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AuthorizationPage from '../pages/authorization';
import RestorePasswordPage from '../pages/restorePassword';
import AppRoute from '../route/index';

import './index.scss'

const App = ({ history, location }) => {
    const accessToken = useSelector(state => state.user.accessToken);
    const restorePassword = useSelector(state => state.commonFlags.restorePassword);
    const pages = useSelector(state => state.pages.list);

    const getTemplate = () => {
        if (restorePassword) return <RestorePasswordPage history={history}/>;
        if (!accessToken) return <AuthorizationPage history={history}/>;
        return (
            <>
                <Header/>
                <div className='workspace'>
                    <Sidebar options={pages}/>
                    <AppRoute location={location}/>
                </div>
            </>
        )
    }
    return <>{getTemplate()}</>
}

const Application = withRouter(App);
export default hot(module)(() => <Application/>);
