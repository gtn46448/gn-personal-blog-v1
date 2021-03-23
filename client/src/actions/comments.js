import { FETCH_COMMENTS, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../constants/actionTypes.js'
import * as api from '../api/index.js';

//Action Creators
export const getComments = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchComments(id);

        dispatch({ type: FETCH_COMMENTS, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const createComment = (comment) => async (dispatch) => {
    try {
        const { data } = await api.createComment(comment);

        dispatch({ type: CREATE_COMMENT, payload: data });
    } catch (error) {
        console.error(error);
    }
}

export const updateComment = (id, comment) => async (dispatch) => {
    try {
        const { data } = await api.updateComment(id, comment);

        dispatch({ type: UPDATE_COMMENT, payload: data });
    } catch (error) {
        console.error(error);
    }
}

export const deleteComment = (id) => async (dispatch) => {
    try {
        await api.deleteComment(id);

        dispatch({ type: DELETE_COMMENT, payload: id });
    } catch (error) {
        console.error(error);
    }
}

export const likeComment = (id) => async (dispatch) => {
    try {
        await api.likeComment(id);

        dispatch({ type: UPDATE_COMMENT, payload: id });
    } catch (error) {
        console.error(error);
    }
}