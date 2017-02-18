import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import { MainRoute, RegisterRoute, WriteRoute, CallbackRoute } from 'containers/routes';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={MainRoute}/>
        <Route path="register" component={RegisterRoute}/>
        <Route path="write" component={WriteRoute}/>
        <Route path="callback" component={CallbackRoute}/>
    </Route>
);