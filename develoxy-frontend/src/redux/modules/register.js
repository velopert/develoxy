import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as auth from 'helpers/WebApi/auth';
import pender from 'helpers/pender';


const USERNAME_CHECK = "register/USERNAME_CHECK";
const REGISTER = "register/REGISTER";

const SET_VALIDITY = 'register/SET_VALIDITY';
const ACCOUNT_LINK = 'register/ACCOUNT_LINK';


/* action creators */

export const checkUsername = (username) => ({
    type: USERNAME_CHECK,
    payload: {
        promise: auth.checkUsername(username)
    }
});

export const register = (username) => ({
    type: REGISTER,
    payload: {
        promise: auth.register(username)
    }
});

export const setValidity = createAction(SET_VALIDITY);
export const linkAccount = (token) => ({
    type: ACCOUNT_LINK,
    payload: {
        promise: auth.linkAccount(token)
    }
});

/* initialState */
const initialState = Map({
    pending: Map({
        checkUsername: false,
        register: false,
        linkAccount: false
    }),
    token: null,
    validation: Map({
        valid: true,
        message: ''
    })
})

/* reducer */
export default handleActions({

    ...pender({
        type: USERNAME_CHECK,
        name: 'checkUsername',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            if(data.exists) {
                return state.mergeIn(['validation'], {
                    valid: false,
                    message: 'USERNAME_EXISTS'
                });
            } else {
                return state.mergeIn(['validation'], {
                    valid: true,
                    message: ''
                });
            }
        }
    }),

    ...pender({
        type: REGISTER,
        name: 'register',
        onFulfill: (state, action) => {
            const { data: { token } } = action.payload;
            return state.set('token', token);
        }
    }),

    ...pender({
        type: ACCOUNT_LINK,
        name: 'linkAccount'
    }),

    [SET_VALIDITY]: (state, action) => {
        const { valid, message } = action.payload;

        return state.mergeIn(['validation'], { 
            valid,
            message: (!message) ? '' : message
        });
    }
}, initialState);