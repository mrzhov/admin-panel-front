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
                if (this.props.location.pathname !== '/admin/start') {
                    return <Redirect to={{pathname: '/admin/start'}}/>
                } else {
                    const RouteComponent = route.component;
                    return <RouteComponent {...props} />;
                }
            }
        };
    }

    checkRouteDefence(role, isSuper, route) {
        const agentRoutePath = [
            '/admin/users/:id/edit',
            '/admin/users',
            '/admin/users/:id',
            '/admin/users/:id/change-password',
            '/admin/coupons/:id',
            '/admin/coupons',
            '/admin/coupon-types/:id',
            '/admin/coupon-types',
        ]
        const depositRoute = [
            '/admin/deposits/:id',
            '/admin/deposits'
        ]
        const subAgentRoutePath = [
            '/admin/users/:id/change-password',
            '/admin/coupons/:id',
            '/admin/coupons',
            '/admin/coupon-types/:id',
            '/admin/coupon-types',
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
            <Redirect from="/admin/**" to="/admin/start"/>
        </Switch>;
    }
}

const mapStateToProps = (state) => ({
    userRole: state.user.role,
    userIsSuper: state.user.isSuper
});

export default connect(mapStateToProps)(AppRoute);
