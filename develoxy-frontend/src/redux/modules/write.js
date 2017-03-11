import { createAction, handleActions } from 'redux-actions';
import createPromiseAction from 'helpers/createPromiseAction';
import pender from 'helpers/pender';

import { Map, List } from 'immutable';

import * as category from 'helpers/WebApi/user/category';
import * as post from 'helpers/WebApi/user/post';

/* actions */
const INITIALIZE = 'write/INITIALIZE';

const TITLE_CHANGE = 'write/TITLE_CHANGE';
const MARKDOWN_CHANGE = 'write/MARKDOWN_CHANGE';
const FULLSCREEN_SET = 'write/FULLSCREEN_SET';
const SCROLL_PERCENTAGE_SET = 'write/SCROLL_PERCENTAGE_SET';
const IS_LASTLINE_SET = 'write/IS_LASTLINE_SET';
const VISIBILITY_SET = 'write/VISIBILITY_SET';

// Category
const CATEGORY_GET = 'write/CATEGORY_GET';
const CATEGORY_CREATE = 'write/CATEGORY_CREATE';
const CATEGORY_MOVE = 'write/CATEGORY_MOVE';
const CATEGORY_DELETE = 'write/CATEGORY_DELETE';
const CATEGORY_RENAME = 'write/CATEGORY_RENAME';

const CATEGORY_TOGGLE = 'write/CATEGORY_TOGGLE';

const TAG_INPUT_CHANGE = 'write/TAG_INPUT_CHANGE';
const TAG_INSERT = 'write/TAG_INSERT';
const TAG_REMOVE = 'write/TAG_REMOVE';

const POST_CREATE = 'write/POST_CREATE';
const POST_UPDATE = 'write/POST_UPDATE';





/* action creators */
export const initialize = createAction(INITIALIZE);

export const changeTitle = createAction(TITLE_CHANGE);
export const changeMarkdown = createAction(MARKDOWN_CHANGE);
export const setFullscreen = createAction(FULLSCREEN_SET);
export const setScrollPercentage = createAction(SCROLL_PERCENTAGE_SET);
export const setIsLastLine = createAction(IS_LASTLINE_SET);
export const setVisibility = createAction(VISIBILITY_SET);

export const getCategory = createPromiseAction(CATEGORY_GET, category.getCategory);
export const createCategory = createPromiseAction(CATEGORY_CREATE, category.createCategory);
export const moveCategory = createPromiseAction(CATEGORY_MOVE, category.moveCategory);
export const deleteCategory = createPromiseAction(CATEGORY_DELETE, category.deleteCategory);
export const renameCategory = createPromiseAction(CATEGORY_RENAME, category.renameCategory);

export const toggleCategory = createAction(CATEGORY_TOGGLE);


export const changeTagInput = createAction(TAG_INPUT_CHANGE);
export const insertTag = createAction(TAG_INSERT);
export const removeTag = createAction(TAG_REMOVE);


export const createPost = createPromiseAction(POST_CREATE, post.createPost);
export const updatePost = createPromiseAction(POST_UPDATE, post.updatePost);

import { orderify, treeize, flatten } from 'helpers/category';


/* initialState */
const initialState = Map({
    pending: Map({
        getCategory: false,
        moveCategory: false,
        deleteCategory: false,
        renameCategory: false,
        createCategory: false,

        createPost: false,
        updatePost: false
    }),
    editor: Map({
        title: '',
        markdown: '',
        fullscreen: false,
        scrollPercentage: 0,
        isLastLine: false,
        visibility: 'public'
    }),
    tags: Map({
        input: '',
        list: List()
    }),
    category: Map({
        flat: List(),
        tree: Map()
    }),
    workingPost: Map({
        postId: null,
        isTemp: true
    })
})

/* reducer */
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,

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
        // 마지막 줄이면 우측 preview 도 같이 스크롤되게끔
        // 방금 수정한 줄이 맨 마지막 줄인지 기록한다
        const current = state.getIn(['editor', 'isLastLine']);
        if(current===action.payload) {
            return state;
        } else {
            return state.setIn(['editor', 'isLastLine'], action.payload);
        }
    },
    [VISIBILITY_SET]: (state, action) => (
        // 게시글 공개 및 비공개 설정
        state.setIn(['editor', 'visibility'], action.payload)
    ),

    /*
        Category
    */
    ...pender({
        type: CATEGORY_GET,
        name: 'getCategory',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            // const flat = List(orderify(data.category).map((item)=>Map(item)));
            const flat = List(flatten(treeize(orderify(data.category))).map((item)=>Map(item)));
            return state.setIn(['category', 'flat'], flat);
        }
    }),


    ...pender({
        type: CATEGORY_MOVE,
        name: 'moveCategory',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            // const flat = List(orderify(data.category).map((item)=>Map(item)));
            const flat = List(flatten(treeize(orderify(data.category))).map((item)=>Map(item)));
            return state.setIn(['category', 'flat'], flat);
        }
    }),

    ...pender({
        type: CATEGORY_DELETE,
        name: 'deleteCategory',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            // const flat = List(orderify(data.category).map((item)=>Map(item)));
            const flat = List(flatten(treeize(orderify(data.category))).map((item)=>Map(item)));
            return state.setIn(['category', 'flat'], flat);
        }
    }),

    ...pender({
        type: CATEGORY_RENAME,
        name: 'renameCategory',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            // const flat = List(orderify(data.category).map((item)=>Map(item)));
            const flat = List(flatten(treeize(orderify(data.category))).map((item)=>Map(item)));
            return state.setIn(['category', 'flat'], flat);
        }
    }),

    ...pender({
        type: CATEGORY_CREATE,
        name: 'createCategory',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            // const flat = List(orderify(data.category).map((item)=>Map(item)));
            const flat = List(flatten(treeize(orderify(data.category))).map((item)=>Map(item)));
            return state.setIn(['category', 'flat'], flat);
        }
    }),

    [CATEGORY_TOGGLE]: (state, action) => {
        const flat = state.getIn(['category', 'flat']);
        const currentValue = flat.getIn([action.payload, 'value']) === undefined ? false : flat.getIn([action.payload, 'value']);

        return state.setIn(['category', 'flat'], flat.setIn([action.payload, 'value'], !currentValue))
    },

    /*
        tags
    */

    [TAG_INPUT_CHANGE]: (state, action) => {
        // payload: string
        return state.setIn(['tags', 'input'], action.payload);
    },

    [TAG_INSERT]: (state, action) => {
        // payload: string
        const list = state.getIn(['tags', 'list']);
        return state.setIn(['tags', 'list'], list.push(action.payload));
    },

    [TAG_REMOVE]: (state, action) => {
        const list = state.getIn(['tags', 'list']);
        // payload: integer 
        return state.setIn(['tags', 'list'], list.delete(action.payload));

    },


    // 포스트 생성
    ...pender({
        type: POST_CREATE,
        name: 'createPost',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            return state.set('workingPost', Map(data));
        }
    }),


    // 포스트 업데이트
    ...pender({
        type: POST_UPDATE,
        name: 'updatePost',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            return state.set('workingPost', Map(data));
        }
    })

}, initialState);