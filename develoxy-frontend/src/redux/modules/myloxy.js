import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';

// action types
const LEFT_BAR_MENU_SELECT = 'myloxy/LEFT_BAR_MENU_SELECT';
const DURUWA_BAR_VISIBILITY_SET = 'myloxy/DURUWA_BAR_VISIBILITY_SET';
const DURUWA_BAR_REVERT = 'myloxy/DURUWA_BAR_REVERT';
const POST_ID_SELECT = 'myloxy/POST_ID_SELECT';



// action creator
export const selectLeftBarMenu = createAction(LEFT_BAR_MENU_SELECT);
export const setDuruwaBarVisibility = createAction(DURUWA_BAR_VISIBILITY_SET);
export const selectPostId = createAction(POST_ID_SELECT);
export const revertDuruwaBar = createAction(DURUWA_BAR_REVERT);

// initial state
const initialState = Map({
    leftBar: Map({
        prev: 'all', 
        current: 'all' // [all, category, tag]
    }),
    duruwaBar: Map({
        visible: false
    }),
    postId: null
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
    },
    [POST_ID_SELECT]: (state, action) => {
        return state.set('postId', action.payload)
    },
    [DURUWA_BAR_REVERT]: (state, action) => {
        return state;
    }
}, initialState);