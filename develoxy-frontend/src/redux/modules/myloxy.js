import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';

// action types
const LEFT_BAR_MENU_SELECT = 'myloxy/LEFT_BAR_MENU_SELECT';
const DURUWA_BAR_VISIBILITY_SET = 'myloxy/DURUWA_BAR_VISIBILITY_SET';

// action creator
export const selectLeftBarMenu = createAction(LEFT_BAR_MENU_SELECT);
export const setDuruwaBarVisibility = createAction(DURUWA_BAR_VISIBILITY_SET);

// initial state
const initialState = Map({
    leftBar: Map({
        prev: 'all', 
        current: 'all' // [all, category, tag]
    }),
    duruwaBar: Map({
        visible: false
    })
});

// reducer
export default handleActions({
    [LEFT_BAR_MENU_SELECT]: (state, action) => {
        return state.mergeIn(['leftBar'], {
            prev: state.getIn(['leftBar', 'current']),
            current: action.payload
        });
    },
    [DURUWA_BAR_VISIBILITY_SET]: (state, action) => {
        return state.setIn(['duruwaBar', 'visible'], action.payload);
    }
}, initialState);