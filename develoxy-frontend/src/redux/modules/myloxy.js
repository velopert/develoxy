import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';

// action types
const LEFT_BAR_MENU_SELECT = 'myloxy/LEFT_BAR_MENU_SELECT';

// action creator
export const selectLeftBarMenu = createAction(LEFT_BAR_MENU_SELECT);

// initial state
const initialState = Map({
    leftBarMenu: 'all' // [all, category, tag]
});

// reducer
export default handleActions({
    [LEFT_BAR_MENU_SELECT]: (state, action) => {
        return state.set('leftBarMenu', action.payload);
    }
}, initialState);