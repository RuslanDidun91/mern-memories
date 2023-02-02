import React from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import Post from './Post/Post'
import { Grid, CircularProgress } from '@material-ui/core'



const Posts = ({setCurrentId}) => {

  const posts = useSelector((state) => state.posts)
  const classes = useStyles();
  // console.log(posts)

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          //sx={12} = 1 per row, md={6} = 2 per row, lg={3} = 4 per row
          <Grid key={post._id} item sx={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;