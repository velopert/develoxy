import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

import {ApolloProvider} from 'react-apollo';
import {client} from 'redux/configureStore';


class Root extends React.Component {
    render() {
        const {store} = this.props;

        return (
            <ApolloProvider store={store} client={client}>
                <Router>
                    <App/>
                </Router>
            </ApolloProvider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object,
    history: PropTypes.object
}

export default Root;