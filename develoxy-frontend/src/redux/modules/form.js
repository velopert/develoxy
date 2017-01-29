import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const INITIALIZE = "form/INITIALIZE";
const CHANGE = "form/CHANGE";

/* action creators */
export const initialize = createAction(INITIALIZE);
export const change = createAction(CHANGE);

/* initialState */
const initialState = Map({
    register: Map({
        username: ''
    })
})

/* reducer */
export default handleActions({
    [INITIALIZE]: (state, action) => {
        // 특정 폼 내용들을 초기값으로 설정함
        const formName = action.payload;
        const initialForm = initialState.get(formName);
        return state.set('register', initialForm);
    },
    [CHANGE]: (state,action) => {
        // 특정 폼의 내용을 설정함
        const { formName, name, value } = action.payload;
        return state.setIn([formName, name], value);
    }
}, initialState);