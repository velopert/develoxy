import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from 'routes';

class Root extends React.Component { 
    render() {
        const { store, history } = this.props;
        return(
          <Provider store={store}>
             <Router routes={routes} history={history} createElement={this.createElement}/>
          </Provider>
        );
    }
}
// const Root = ({store, history}) => {
//     return (
//         <Provider store={store}>
//             <Router routes={routes} history={history}/>
//         </Provider>
//     );
// };

// const Root = ({store, routes}) => {
//     return (
//         <Provider store={store}>
//             <Router history={browserHistory}>
//                 {routes}
//             </Router>
//         </Provider>
//     );
// };

Root.propTypes = {
    store: PropTypes.object,
    history: PropTypes.object
}

export default Root;