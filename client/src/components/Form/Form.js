import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {

  const [postData, setPostData] = useState({
    title: '', message: '',
    tags: [], selectedFile: ''
  })

  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  //css classes
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  //fetching post information for update
  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '', message: '',
      tags: [], selectedFile: '',
    })
  }

  const handleSubmit = async (e) => {
    //to prevent refreshing the browser
    e.preventDefault();
    if (currentId === 0) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      // dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      // dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
      clear();
    }
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={5}>
      <form autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}>
        <Typography variant='h6'> {currentId ? 'Editing' : 'Creating'} a Memory </Typography>
        <TextField
          name='title' variant='outlined'
          label='Title' fullWidth
          value={postData.title}
          //...postData to not override other text field
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

        <TextField
          name='message' variant='outlined' label='Message'
          fullWidth multiline minRows={3} value={postData.message}
          //...postData to not override other text field
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <TextField
          name='tags' variant='outlined' label='Tags'
          fullWidth value={postData.tags}
          //...postData to not override other text field
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        <div className={classes.fileInput}>
          {/* file upload */}
          <FileBase
            type='file' multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit}
          variant="contained" color="primary" size="large"
          type="submit" fullWidth>Submit</Button>

        <Button variant="contained"
          color="secondary" size="small"
          onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form; 