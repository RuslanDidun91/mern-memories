import express from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getpostsBySearch
} from '../controllers/posts.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.get('/', getPost);
router.get('/search', getpostsBySearch);
router.post('/', isAuth, createPost);
router.patch('/:id', isAuth, updatePost);
router.delete('/:id', isAuth, deletePost);
router.patch('/:id/likePost', isAuth, likePost);



export default router;