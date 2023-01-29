import express from 'express';
import { getPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import isAuth from '../middleware/auth'

const router = express.Router();


router.get('/', getPost);
router.post('/', isAuth, createPost);
router.patch('/:id', isAuth, updatePost);
router.delete('/:id', isAuth, deletePost);
router.patch('/:id/likePost',isAuth, likePost);
  


export default router;