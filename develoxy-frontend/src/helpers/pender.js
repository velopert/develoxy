// redux action helper for redux-promise-middleware

import { Map } from 'immutable';

// transforms action type to ACTION_TYPE_[PENDING, FULFILLED, REJECTED]

const actionize = (type) => {
    return {
        PENDING: `${type}_PENDING`,
        FULFILLED: `${type}_FULFILLED`,
        REJECTED: `${type}_REJECTED`
    }
}

/*
    usage:
    ...pender({
        type: SOMETHING,
        onFulfill: (state, action) => {
            return state;
        },
        onReject: (state, ction) => {
            return state;
        }
    })
*/


const pender = ({type, onFulfill, onReject}) => {
    const actionized = actionize(type);

    return {
        [actionized.PENDING]: (state, action) => {
            return state.setIn(['pending', type], true);
        },
        [actionized.FULFILLED]: (state, action) => {
            return onFulfill(state, action).setIn(['pending', type], false);
        },
        [actionized.REJECTED]: (state, action) => {
            return onReject(state,action).setIn(['pending', type], false);
        }
    }
}

export default pender;