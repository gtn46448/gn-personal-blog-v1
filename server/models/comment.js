import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    parentPost: String,
    parentComment: String,
    message: String,
    creator: String,
    name: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('PostComment', commentSchema);