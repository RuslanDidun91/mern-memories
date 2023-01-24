import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  //css classes
  const classes = useStyles();
  const dispatch = useDispatch();

  //fetching post information for update
  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  const handleSubmit = (e) => {
    //to prevent refreshing the browser
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  }


  return (
    <Paper className={classes.paper}>
      <form autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}>
        <Typography variant='h6'> {currentId ? 'Editing' : 'Creating'} a Memory </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          //...postData to not override other text field
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />

        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          //...postData to not override other text field
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          //...postData to not override other text field
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          //...postData to not override other text field
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        <div className={classes.fileInput}>
          {/* file upload */}
          <FileBase type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth>Submit</Button>

        <Button variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form; 