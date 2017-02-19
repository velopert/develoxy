import { combineReducers } from 'redux';
import header from './header';
import modal from './modal';
import auth from './auth';
import user from './user';


const base = combineReducers({
    header,
    modal,
    auth,
    user
});

export default base;