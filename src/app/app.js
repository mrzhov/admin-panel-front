import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';
import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AuthorizationPage from '../pages/authorization';
import RestorePasswordPage from '../pages/restorePassword';
import AppRoute from '../route/index';

import './app.scss'

class App extends PureComponent {
    render() {
        const root = document.getElementById('app');

        if (root) {
            root.classList.add('admin');
        }

        if (this.props.restorePassword)
            return <RestorePasswordPage history={this.props.history}/>;

        if (!this.props.accessToken)
            return <AuthorizationPage history={this.props.history}/>;

        return (
            <div className='container-scroller'>
                <Header />
                <div className='container-fluid'>
                    <Sidebar options={this.props.pages}/>
                    <AppRoute location={this.props.location}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.authUser.accessToken,
    restorePassword: state.commonFlags.restorePassword,
    userRole: state.authUser.role,
    pages: state.pages.list
});

const Application = withRouter(connect(mapStateToProps)(App));

export default hot(module)(() => <Application/>);
