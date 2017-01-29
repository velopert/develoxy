import { createAction, handleActions } from 'redux-actions';
import { Map} from 'immutable';

/* actions */
const AUTHENTICATE = "auth/AUTHENTICATE";


/* action creators */
export const authenticate = createAction(AUTHENTICATE);

/* initialState */
const initialState = Map({
    user: null
})

/* reducer */
export default handleActions({
    [AUTHENTICATE]: (state, action) => {
        // user 정보를 저장한다
        const user = action.payload;
        
        return state.set('user', user);
    }
}, initialState);