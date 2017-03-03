import { createAction, handleActions } from 'redux-actions';
import createPromiseAction from 'helpers/createPromiseAction';
import pender from 'helpers/pender';

import { Map, List } from 'immutable';

import * as category from 'helpers/WebApi/user/category';


/* actions */
const TITLE_CHANGE = 'write/TITLE_CHANGE';
const MARKDOWN_CHANGE = 'write/MARKDOWN_CHANGE';
const FULLSCREEN_SET = 'write/FULLSCREEN_SET';
const SCROLL_PERCENTAGE_SET = 'write/SCROLL_PERCENTAGE_SET';
const IS_LASTLINE_SET = 'write/IS_LASTLINE_SET';

// Category
const CATEGORY_GET = 'write/CATEGORY_GET';
const CATEGORY_CREATE = 'write/CATEGORY_CREATE';
const CATEGORY_MOVE = 'write/CATEGORY_MOVE';
const CATEGORY_DELETE = 'write/CATEGORY_DELETE';
const CATEGORY_RENAME = 'write/CATEGORY_RENAME';


/* action creators */
export const changeTitle = createAction(TITLE_CHANGE);
export const changeMarkdown = createAction(MARKDOWN_CHANGE);
export const setFullscreen = createAction(FULLSCREEN_SET);
export const setScrollPercentage = createAction(SCROLL_PERCENTAGE_SET);
export const setIsLastLine = createAction(IS_LASTLINE_SET);

export const getCategory = createPromiseAction(CATEGORY_GET, category.getCategory);
export const moveCategory = createPromiseAction(CATEGORY_MOVE, category.moveCategory);
export const deleteCategory = createPromiseAction(CATEGORY_DELETE, category.deleteCategory);


import { orderify, treeize, flatten } from 'helpers/category';


/* initialState */
const initialState = Map({
    pending: Map({
        getCategory: false,
        moveCategory: false,
        deleteCategory: false
    }),
    editor: Map({
        title: '',
        markdown: '',
        fullscreen: false,
        scrollPercentage: 0,
        isLastLine: false
    }),
    category: Map({
        flat: List(),
        tree: Map()
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
    },


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
    })
}, initialState);