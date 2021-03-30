import axios from 'axios';

const API = axios.create({ baseURL: 'https://gnblog-v1.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const fetchComments = (id) => API.get(`/comments/${id}`);
export const createComment = (newPost) => API.post('/comments', newPost);
export const updateComment = (id, updatedPost) => API.patch(`/comments/${id}`, updatedPost);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
export const likeComment = (id) => API.patch(`/comments/${id}/likeComment`);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);