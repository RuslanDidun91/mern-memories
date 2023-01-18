import React from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import Post from './Post/Post'



const Posts = () => {

  const posts = useSelector((state) => state.posts)
  const classes = useStyles();
  console.log(posts)

  return (
    <>
    <h1>Posts</h1>
    <Post />
    <Post />
    </>
  )
}

export default Posts;