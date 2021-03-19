import mongoose from 'mongoose';

const blogPostSchema = mongoose.Schema({
    title: String,
    content: String,
    creator: String,
    name: String,
    tags: [String],
    headerImage: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const BlogPost = mongoose.model('blogPost', blogPostSchema);

export default BlogPost;