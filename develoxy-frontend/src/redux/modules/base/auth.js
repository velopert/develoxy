import { createAction, handleActions } from 'redux-actions';
import { Map} from 'immutable';

/* actions */
const SOMETHING = "something/SOMETHING";

/* action creators */
export const something = createAction(SOMETHING);

/* initialState */
const initialState = Map({
    something: true
})

/* reducer */
export default handleActions({
    [SOMETHING]: (state, action) => (
        state
    )
}, initialState);