import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
// const SOMETHING = "something/SOMETHING";
const TITLE_CHANGE = 'write/TITLE_CHANGE';
const MARKDOWN_CHANGE = 'write/MARKDOWN_CHANGE';


/* action creators */
// export const something = createAction(SOMETHING);
export const changeTitle = createAction(TITLE_CHANGE);
export const changeMarkdown = createAction(MARKDOWN_CHANGE);

/* initialState */
const initialState = Map({
    editor: Map({
        title: '',
        markdown: ''
    })
})

/* reducer */
export default handleActions({
    [TITLE_CHANGE]: (state, action) => (
        state.setIn(['editor', 'title'], action.payload)
    ),
    [MARKDOWN_CHANGE]: (state, action) => (
        state.setIn(['editor', 'markdown'], action.payload)
    )
}, initialState);