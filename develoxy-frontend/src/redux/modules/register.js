import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as auth from 'helpers/WebApi/auth';
import pender from 'helpers/pender';

// import Request, { requize, pend, fulfill, reject } from 'helpers/request';
// import users from 'helpers/firebase/database/users';
// import * as profiles from 'helpers/firebase/database/profiles';

/* actions */
// const USERNAME_CHECK = requize('register/USERNAME_CHECK');
// const USERNAME_CLAIM = requize("register/USERNAME_CLAIM");
// const REGISTER = requize("register/REGISTER");

const USERNAME_CHECK = "register/USERNAME_CHECK";
const REGISTER = "register/REGISTER";

const SET_VALIDITY = 'register/SET_VALIDITY';

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


// 유저네임 정하기
// export const claimUsername = ({uid, username}) => ({
//     type: USERNAME_CLAIM.DEFAULT,
//     payload: {
//         promise: users.claimUsername({uid, username})
//     }
// });

// 계정 생성 
// export const register = ({uid, username, displayName, email, thumbnail}) => ({
//     type: REGISTER.DEFAULT,
//     payload: {
//         promise: users.create({uid, username, displayName, email, thumbnail})
//     }
// });

export const setValidity = createAction(SET_VALIDITY);

/* initialState */
const initialState = Map({
    pending: Map({
        checkUsername: false
    }),
    validation: Map({
        valid: true,
        message: ''
    })
})

/* reducer */
export default handleActions({

    ...pender({
        type: USERNAME_CHECK,
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
    // // USERNAME_CHECK 
    // [USERNAME_CHECK.PENDING]: (state,action) => {
    //     return pend(state, 'checkUsername');
    // },
    // [USERNAME_CHECK.FULFILLED]: (state, action) => {
        
    //     return fulfill(state, 'checkUsername')
    // },
    // [USERNAME_CHECK.REJECTED]: (state, action) => {
    //     const error = action.payload;
    //     return reject(state, 'checkUsername', error);
    // },

    // // USERNAME_CLAIM 
    // [USERNAME_CLAIM.PENDING]: (state,action) => {
    //     return pend(state, 'claimUsername');
    // },
    // [USERNAME_CLAIM.FULFILLED]: (state, action) => {
    //     return fulfill(state, 'claimUsername')
    // },
    // [USERNAME_CLAIM.REJECTED]: (state, action) => {
    //     const error = action.payload;
    //     return reject(state, 'claimUsername', error);
    // },

    // // REGISTER 
    // [REGISTER.PENDING]: (state,action) => {
    //     return pend(state, 'register');
    // },
    // [REGISTER.FULFILLED]: (state, action) => {    
    //     return fulfill(state, 'register');
    // },
    // [REGISTER.REJECTED]: (state, action) => {
    //     const error = action.payload;
    //     return reject(state, 'register', error);
    // },

    [SET_VALIDITY]: (state, action) => {
        const { valid, message } = action.payload;

        return state.mergeIn(['validation'], { 
            valid,
            message: (!message) ? '' : message
        });
    }
}, initialState);