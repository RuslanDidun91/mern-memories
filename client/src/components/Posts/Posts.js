import React from 'react';
import useStyles from './styles';



const Posts = () => {

  const classes = useStyles();

  return (
    <>
    <h1>Posts</h1>
    <Post />
    <Post />
    </>
  )
}

export default Posts;