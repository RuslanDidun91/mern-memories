import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch
} from '../controllers/posts.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/search', getPostsBySearch);
router.post('/', isAuth, createPost);
router.patch('/:id', isAuth, updatePost);
router.delete('/:id', isAuth, deletePost);
router.patch('/:id/likePost', isAuth, likePost);



export default router;