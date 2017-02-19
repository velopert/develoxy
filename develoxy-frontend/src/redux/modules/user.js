import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const USER_INFO_SET = "user/USER_INFO_SET";

/* action creators */
export const something = createAction(USER_INFO_SET);

/* initialState */
const initialState = Map({
    userInfo: Map({
        userId: null,
        username: null,
        displayName: null
    })
})

/* reducer */
export default handleActions({
    [USER_INFO_SET]: (state, action) => (
        state.set('userInfo', Map(action.payload))
    )
}, initialState);