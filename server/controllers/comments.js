import mongoose from 'mongoose';
import PostComment from '../models/comment.js';

export const getComments = async (req,res) => {
    const { parentId } = req.params;

    try {
        const comments = await PostComment.find({ parentPost: parentId }).lean();
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createComment = async (req,res) => {
    const comment = req.body;

    const newComment = new PostComment({ ...comment, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateComment = async (req,res) => {
    const { id : _id } = req.params;
    const comment = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no comment with that id');

    try {
        const updatedComment = await PostComment.findByIdAndUpdate(_id, { ...comment, _id, createdAt: new Date().toISOString() }, { new: true });

        res.json(updatedComment);
    } catch (error) {
        res.json(409).json({ message: error.message });
    }
}

export const deleteComment = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no comment with that id');

    try {
        await PostComment.findbyIdAndDelete(id);

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const likeComment = async (req,res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no comment with that id');

    try {
        const comment = await PostComment.findById(id);
        const index = comment.likes.findIndex((id) => id === String(req.userId));

        if(index === -1) {
            comment.likes.push(req.userId);
        } else {
            comment.likes = comment.likes.filter(id => id !== String(req.userId));
        }

        const updatedComment = await PostComment.findByIdAndUpdate(id, comment, { new: true });

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}