import { Map } from 'immutable';


// creates a Request Map
const Request = () => Map({
    fetching: false,
    fetched: false,
    error: null
});

export default Request;


// transforms action type to ACTION_TYPE_[PENDING, FULFILLED, REJECTED]
export const requize = (type) => {
    return {
        DEFAULT: type,
        PENDING: `${type}_PENDING`,
        FULFILLED: `${type}_FULFILLED`,
        REJECTED: `${type}_REJECTED`
    }
}

// pends the request
export const pend = (state, requestType) => {
    return state.mergeDeep({
        requests: {
            [requestType]: {
                fetching: true,
                fetched: false,
                error: null
            }
        }
    });
}

// fulfills the request
export const fulfill = (state, requestType) => {
    return state.mergeDeep({
        requests: {
            [requestType]: {
                fetching: false,
                fetched: true
            }
        }
    });
}

// rejects the request
export const reject = (state, requestType, error) => {
    return state.mergeDeep({
        requests: {
            [requestType]: {
                fetching: false,
                fetched: false,
                error: error
            }
        }
    });
}