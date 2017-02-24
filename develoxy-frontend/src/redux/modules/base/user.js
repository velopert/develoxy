import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const USER_INFO_SET = 'user/USER_INFO_SET';
const LOGOUT = 'user/LOGOUT';

/* action creators */
export const setUserInfo = createAction(USER_INFO_SET);
export const logout = createAction(LOGOUT);
/* initialState */
const initialState = Map({
    profile: Map({
        userId: null,
        username: null,
        displayName: null,
        thumbnail: null
    }),
    tokenToIntegrate: null
})

/* reducer */
export default handleActions({
    [USER_INFO_SET]: (state, action) => (
        state.mergeIn(['profile'], action.payload)
    ),
    [LOGOUT]: (state, action) => (
        state.set('profile', initialState.get('profile'))
    )
}, initialState);