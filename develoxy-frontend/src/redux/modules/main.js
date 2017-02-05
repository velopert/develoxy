import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const SORTER_SET = "main/SORTER_SET";

/* action creators */
export const setSorter = createAction(SORTER_SET);

/* initialState */
const initialState = Map({
    sorter: Map({
        value: 'recent'
    })
})

/* reducer */
export default handleActions({
    [SORTER_SET]: (state, action) => {
    // SORTER 값을 설정한다
        const value = action.payload;
        return state.setIn(['sorter', 'value'], value);
    }
}, initialState);