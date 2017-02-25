import React from 'react'
import ReactRouter, { Route, IndexRoute} from 'react-router'
import Wrapper from './components/wrapper'
import Home from './containers/home'

module.exports = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Home} />
        {/* <Route path="/hero/:name" component={Hero} /> */}
    </Route>
);
