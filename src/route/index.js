import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import { ADMIN, AGENT, SUB_AGENT } from "../lib/_variables";
import { agentRoutePath, subAgentRoutePath, superAgentRoutePath } from "../lib/routePaths";

const AppRoute = ({ location }) => {
    const userRole = useSelector(state => state.user.role);
    const userIsSuper = useSelector(state => state.user.isSuper);

    const routeRender = route => props => {
        if (!checkRouteDefence(route) && location.pathname !== '/agents') {
            return <Redirect to={{ pathname: '/agents' }}/>
        }
        const RouteComponent = route.component;
        return <RouteComponent {...props} />;
    }
    const checkRouteDefence = route => {
        let result = false;
        switch (userRole) {
            case ADMIN:
                result = true;
                break;
            case AGENT:
                userIsSuper
                    ? result = superAgentRoutePath.includes(route.path)
                    : result = agentRoutePath.includes(route.path);
                break;
            case SUB_AGENT:
                result = subAgentRoutePath.includes(route.path);
                break;
            default:
                break;
        }
        return result;
    }

    const routesTemplate = () => {
        const routes = [];
        for (const key in Routes) {
            const route = Routes[key];
            routes.push(
                <Route
                    exact
                    key={route.path}
                    path={route.path}
                    render={routeRender(route)}
                />
            )
        }
        return routes;
    }

    return (
        <Switch>
            {routesTemplate()}
            <Redirect from="/**" to="/agents"/>
        </Switch>
    )
}

export default AppRoute;
