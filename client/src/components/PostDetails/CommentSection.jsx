import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";

const CommentSection = ({ post }) => {

  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a Comment</Typography>
          <TextField
            fullWidth minRows={4}
            variant='outlined'
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)} />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>        
          </div>
      </div>
    </div>
  )
}

export default CommentSection;