import { combineReducers } from 'redux';
import header from './header';
import modal from './modal';

const base = combineReducers({
    header,
    modal
});

export default base;