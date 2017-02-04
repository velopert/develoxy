import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const AUTHENTICATE = "auth/AUTHENTICATE";
const PROFILE_SYNC = "auth/PROFILE_SYNC";


/* action creators */
export const authenticate = createAction(AUTHENTICATE);
export const syncProfile = createAction(PROFILE_SYNC);

/* initialState */
const initialState = Map({
    user: null,
    profile: Map({
        username: null,
        displayName: null,
        thumbnail: null
    }),
    profileSynced: false
})

/* reducer */
export default handleActions({
    [AUTHENTICATE]: (state, action) => {
        // user 정보를 저장한다
        const user = action.payload;
        return state.set('user', user);
    },
    [PROFILE_SYNC]: (state, action) => {
        // 프로필 정보를 동기화한다
        const profile = action.payload;

        // null 이면 초기상태로
        
        if(profile===null) {
            return state.merge({
                profileSynced: true,
                profile: initialState.get('profile')
            })
        }
        // return state.set('profile', Map(profile));
        return state.merge({
            profileSynced: true,
            profile
        })
    }
}, initialState);