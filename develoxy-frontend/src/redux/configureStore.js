import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { ApolloClient } from 'react-apollo';

/* load modules */
import base from './modules/base';
import form from './modules/form';
import register from './modules/register';
import main from './modules/main';
import write from './modules/write';
import myloxy from './modules/myloxy';

// Initialize Apollo ApolloClient
export const client = new ApolloClient();



/* configure middleware */
const middlewares = [promiseMiddleware(), client.middleware()];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

/* combine the reducers */
const reducer = combineReducers({
    apollo: client.reducer(),
    base,
    form,
    register,
    main,
    write,
    myloxy,
    
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;