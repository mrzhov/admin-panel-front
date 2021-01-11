import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';
import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

import LeftMenu from '../components/left-menu';
import AuthorizationPage from '../pages/authorization';
import RestorePasswordPage from '../pages/restorePassword';

import AppRoute from '../route/index';

class App extends PureComponent {
    render() {
        const root = document.getElementById('app');

        if (root) {
            root.classList.add('admin');
        }

        if (this.props.restorePassword)
            return <RestorePasswordPage history={this.props.history}/>;

        if (!this.props.token)
            return <AuthorizationPage history={this.props.history}/>;

        return (
            <>
                <LeftMenu options={this.props.pages}/>
                <AppRoute location={this.props.location}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    restorePassword: state.commonFlags.restorePassword,
    userRole: state.user.role,
    pages: state.pages.list
});

const Application = withRouter(connect(mapStateToProps)(App));

export default hot(module)(() => <Application/>);
