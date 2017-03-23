import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

/* load modules */
import base from './modules/base';
import form from './modules/form';
import register from './modules/register';
import main from './modules/main';
import write from './modules/write';
import myloxy from './modules/myloxy';

/* configure middleware */
const middlewares = [promiseMiddleware()];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

/* combine the reducers */
const reducer = combineReducers({
    base,
    form,
    register,
    main,
    write,
    myloxy
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;