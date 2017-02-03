import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'helpers/request';
import users from 'helpers/firebase/database/users';
// import * as profiles from 'helpers/firebase/database/profiles';

/* actions */
const USERNAME_CHECK = requize('register/USERNAME_CHECK');
const USERNAME_CLAIM = requize("register/USERNAME_CLAIM");
const REGISTER = requize("register/REGISTER");
const SET_VALIDITY = 'register/SET_VALIDITY';

/* action creators */

// 유저네임 체킹
export const checkUsername = (username) => ({
    type: USERNAME_CHECK.DEFAULT,
    payload: {
        promise: users.checkUsername(username)
    }
});


// 유저네임 정하기
export const claimUsername = ({uid, username}) => ({
    type: USERNAME_CLAIM.DEFAULT,
    payload: {
        promise: users.claimUsername({uid, username})
    }
});

// 계정 생성 
export const register = ({uid, username, displayName, email, thumbnail}) => ({
    type: REGISTER.DEFAULT,
    payload: {
        promise: users.create({uid, username, displayName, email, thumbnail})
    }
});

export const setValidity = createAction(SET_VALIDITY);

/* initialState */
const initialState = Map({
    request: Map({
        checkUsername: Request(),
        claimUsername: Request(),
        register: Request()
    }),
    validation: Map({
        valid: true,
        message: ''
    })
})

/* reducer */
export default handleActions({

    // USERNAME_CHECK 
    [USERNAME_CHECK.PENDING]: (state,action) => {
        return pend(state, 'checkUsername');
    },
    [USERNAME_CHECK.FULFILLED]: (state, action) => {
        return fulfill(state, 'checkUsername')
    },
    [USERNAME_CHECK.REJECTED]: (state, action) => {
        const error = action.payload;
        return reject(state, 'checkUsername', error);
    },

    // USERNAME_CLAIM 
    [USERNAME_CLAIM.PENDING]: (state,action) => {
        return pend(state, 'claimUsername');
    },
    [USERNAME_CLAIM.FULFILLED]: (state, action) => {
        return fulfill(state, 'claimUsername')
    },
    [USERNAME_CLAIM.REJECTED]: (state, action) => {
        const error = action.payload;
        return reject(state, 'claimUsername', error);
    },

    // REGISTER 
    [REGISTER.PENDING]: (state,action) => {
        return pend(state, 'register');
    },
    [REGISTER.FULFILLED]: (state, action) => {    
        return fulfill(state, 'register');
    },
    [REGISTER.REJECTED]: (state, action) => {
        const error = action.payload;
        return reject(state, 'register', error);
    },

    [SET_VALIDITY]: (state, action) => {
        const { valid, message } = action.payload;

        return state.mergeIn(['validation'], { 
            valid,
            message: (!message) ? '' : message
        });
    }
}, initialState);