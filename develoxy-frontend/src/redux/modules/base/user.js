import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const USER_INFO_SET = "user/USER_INFO_SET";

/* action creators */
export const setUserInfo = createAction(USER_INFO_SET);

/* initialState */
const initialState = Map({
    profile: Map({
        userId: null,
        username: null,
        displayName: null,
        thumbnail: null
    })
})

/* reducer */
export default handleActions({
    [USER_INFO_SET]: (state, action) => (
        state.mergeIn(['profile'], action.payload)
    )
}, initialState);