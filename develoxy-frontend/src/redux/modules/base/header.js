import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const USER_MENU_OPEN = "base/header/USER_MENU_OPEN";
const USER_MENU_CLOSE = "base/header/USER_MENU_CLOSE";


/* action creators */
export const openUserMenu = createAction(USER_MENU_OPEN);
export const closeUserMenu = createAction(USER_MENU_CLOSE);

/* initialState */
const initialState = Map({
    userMenu: Map({
        open: false
    })
});

export default handleActions({
    [USER_MENU_OPEN]: (state, action) => (
        state.setIn(['userMenu', 'open'], true)
    ),
    [USER_MENU_CLOSE]: (state,action) => (
        state.setIn(['userMenu', 'open'], false)
    )
}, initialState);