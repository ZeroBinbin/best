import React, { PropTypes }                from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import HomePage                            from './HomePage';
import NotFound                            from './NotFound';
import Users                               from './Users';
import { routeMaps }                       from '../../route.config.json'
import { combine ,find }                   from '../util/ArrayOfObject'


const context = require.context('./', false, /\.jsx$/);
const keys = context.keys();
const components = keys.map((key)=> {
    return {
        componnentName: key.match(/\.\/(.*)\.jsx$/)[1],
        component: context(key)
    }
});
const componentRouteMap = combine(routeMaps, components);

function Routes({ history ,menus }) {
    return (
        < Router
    history = {history} >
        < Route
    path = "/"
    component = {HomePage} / >
        < Route
    path = "/users"
    component = {find(componentRouteMap,'url', '/users'
).
    component
} />
<
    Route
    path = "*"
    component = {NotFound} / >
        < / Router >
)
    ;
}

Routes.propTypes = {
    history: PropTypes.any,
};

export default Routes;
