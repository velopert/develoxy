import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {
    MainPage,
    ReigsterPage,
    WritePage,
    CallbackPage,
    MyLoxyPage
} from './routes';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={MainPage}/>
                <Route path="/write" component={WritePage}/>
                <Route path="/callback" component={CallbackPage}/>
                <Route path="/me" component={MyLoxyPage}/>
            </div>
        );
    }
}

export default Routes;