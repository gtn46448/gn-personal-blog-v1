import express from 'express';

import { getComments, createComment, updateComment, deleteComment, likeComment } from '../controllers/comments.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:parentId', getComments);
router.post('/', auth, createComment);
router.patch('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);
router.patch('/:id/likeComment', auth, likeComment);

export default router;