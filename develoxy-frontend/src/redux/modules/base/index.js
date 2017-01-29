import { combineReducers } from 'redux';
import header from './header';
import modal from './modal';
import auth from './auth';

const base = combineReducers({
    header,
    modal,
    auth
});

export default base;