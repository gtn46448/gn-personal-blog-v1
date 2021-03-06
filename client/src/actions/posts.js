import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js'
import * as api from '../api/index.js';

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const getPost = async (id) => {
    try {
        const { data } = await api.fetchPost(id);

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.error(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.error(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.error(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        await api.likePost(id);

        dispatch({ type: UPDATE, payload: id });
    } catch (error) {
        console.error(error);
    }
}