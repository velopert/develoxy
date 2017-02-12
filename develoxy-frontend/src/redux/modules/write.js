import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
// const SOMETHING = "something/SOMETHING";
const TITLE_CHANGE = 'write/TITLE_CHANGE';
const MARKDOWN_CHANGE = 'write/MARKDOWN_CHANGE';
const FULLSCREEN_SET = 'write/FULLSCREEN_SET';
const SCROLL_PERCENTAGE_SET = 'write/SCROLL_PERCENTAGE_SET';
const IS_LASTLINE_SET = 'write/IS_LASTLINE_SET';

/* action creators */
// export const something = createAction(SOMETHING);
export const changeTitle = createAction(TITLE_CHANGE);
export const changeMarkdown = createAction(MARKDOWN_CHANGE);
export const setFullscreen = createAction(FULLSCREEN_SET);
export const setScrollPercentage = createAction(SCROLL_PERCENTAGE_SET);
export const setIsLastLine = createAction(IS_LASTLINE_SET);

/* initialState */
const initialState = Map({
    editor: Map({
        title: '',
        markdown: '',
        fullscreen: false,
        scrollPercentage: 0,
        isLastLine: false
    })
})

/* reducer */
export default handleActions({
    [TITLE_CHANGE]: (state, action) => (
        state.setIn(['editor', 'title'], action.payload)
    ),
    [MARKDOWN_CHANGE]: (state, action) => (
        state.setIn(['editor', 'markdown'], action.payload)
    ),
    [FULLSCREEN_SET]: (state, action) => (
        state.setIn(['editor','fullscreen'], action.payload)
    ),
    [SCROLL_PERCENTAGE_SET]: (state, action) => (
        state.setIn(['editor', 'scrollPercentage'], action.payload)
    ),
    [IS_LASTLINE_SET]: (state, action) => {
        const current = state.getIn(['editor', 'isLastLine']);
        if(current===action.payload) {
            return state;
        } else {
            return state.setIn(['editor', 'isLastLine'], action.payload);
        }
    }
}, initialState);