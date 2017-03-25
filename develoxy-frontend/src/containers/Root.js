import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from 'routes';

import { ApolloProvider } from 'react-apollo';

import { client } from 'redux/configureStore';


class Root extends React.Component { 
    render() {
        const { store, history } = this.props;
        return(
          <ApolloProvider store={store} client={client}>
             <Router routes={routes} history={history} createElement={this.createElement}/>
          </ApolloProvider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object,
    history: PropTypes.object
}

export default Root;