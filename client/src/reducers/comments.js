import { FETCH_COMMENTS, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../constants/actionTypes.js'

const commentReducer = (comments = [], action) => {
    switch(action.type) {
        case FETCH_COMMENTS:
            return action.payload;
        case CREATE_COMMENT:
            return [...comments, action.payload];
        case UPDATE_COMMENT:
            return comments.map((comment) => comment._id === action.payload._id ? action.payload : comment);
        case DELETE_COMMENT:
            return comments.filter((comment) => comment._id !== action.payload);
        default:
            return comments;
    }
}

export default commentReducer;