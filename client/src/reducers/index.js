import { combineReducers } from 'redux';

import posts from './posts.js';
import comments from './comments.js'
import auth from './auth.js';

export default combineReducers({
    posts, comments, auth
})