import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const MODAL_OPEN = "base/modal/MODAL_OPEN";
const MODAL_CLOSE = "base/modal/MODAL_CLOSE";
const ERROR_SET = "base/modal/ERROR_SET";
const OPTION_SET = "base/modal/OPTION_SET";



/* action creators */
export const openModal = createAction(MODAL_OPEN);
export const closeModal = createAction(MODAL_CLOSE);
export const setError = createAction(ERROR_SET);
export const setOption = createAction(OPTION_SET);



/* initialState */
const initialState = Map({
    category: Map({
        open: false,
        error: null,
        selected: null
    }),
    login: Map({
        open: false,
    }),
    linkAccount: Map({
        open: false,
        token: null,
        provider: null,
        existingProvider: null,

    })
})

/* reducer */
export default handleActions({
    [MODAL_OPEN]: (state, action) => {
        /* modalName 모달을 열어주고, data 값들을 spread 해서 설정한다
            {
                modalName,
                data
            }
        */
        const { modalName, data } = action.payload;

        // 모달 열을때마다 초기화

        const modal = initialState.get(modalName).merge({
            open: true,
            ...data
        });

        return state.set(modalName, modal);
    },
    [MODAL_CLOSE]: (state, action) => {
        // modalName 모달을 숨긴다
        const modalName = action.payload;
        return state.setIn([modalName, 'open'], false);
    },
    [ERROR_SET]: (state, action) => {
        // 에러 값을 설정한다
        const { modalName, error } = action.payload;

        return state.setIn([modalName, 'error'], error);
    },
    [OPTION_SET]: (state, action) => {
        const { modalName, optionName, value } = action.payload;
        return state.setIn([modalName, optionName], typeof value === 'object' ? Map(value) : value);
    }
}, initialState);