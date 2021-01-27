import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import RouteController from '../api/router';

import Routes from './routes';
import {ADMIN, AGENT, SUB_AGENT} from "../lib/_variables";

class AppRoute extends Component {
    componentDidMount() {
        if (!this.props.location) {
            RouteController.set(null, this.props.location);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
            RouteController.set(this.props.location, nextProps.location);
        }

        return true;
    }

    routeRender(route) {
        return props => {
            if (this.checkRouteDefence(this.props.userRole, this.props.userIsSuper, route)) {
                const RouteComponent = route.component;
                return <RouteComponent {...props} />;
            } else {
                if (this.props.location.pathname !== '/users/me') {
                    return <Redirect to={{pathname: '/users/me'}}/>
                } else {
                    const RouteComponent = route.component;
                    return <RouteComponent {...props} />;
                }
            }
        };
    }

    checkRouteDefence(role, isSuper, route) {
        const agentRoutePath = [
            '/users/:id/edit',
            '/users',
            '/users/:id',
            '/users/:id/change-password',
            '/coupons/:id',
            '/coupons',
            '/coupon-types/:id',
            '/coupon-types',
        ]
        const depositRoute = [
            '/deposits/:id',
            '/deposits'
        ]
        const subAgentRoutePath = [
            '/users/:id/change-password',
            '/coupons/:id',
            '/coupons',
            '/coupon-types/:id',
            '/coupon-types',
        ]

        switch (role) {
            case ADMIN:
                return true
            case AGENT:
                if (isSuper) {
                    return agentRoutePath.concat(depositRoute).includes(route.path)
                } else {
                    return agentRoutePath.includes(route.path)
                }
            case SUB_AGENT:
                return subAgentRoutePath.includes(route.path)
            default:
                break;
        }
    }

    render() {
        const result = [];

        for (const key in Routes) {
            if (Routes.hasOwnProperty(key)) {
                const route = Routes[key];
                const $key =
                    typeof route.path === 'string' ? route.path : route.path[0];

                result.push(
                    <Route
                        exact
                        key={$key}
                        path={route.path}
                        render={this.routeRender(route)}
                    />
                );
            }
        }

        return <Switch>
            {result}
            <Redirect from="/**" to="/users/me"/>
        </Switch>;
    }
}

const mapStateToProps = (state) => ({
    userRole: state.authUser.role,
    userIsSuper: state.authUser.isSuper
});

export default connect(mapStateToProps)(AppRoute);
