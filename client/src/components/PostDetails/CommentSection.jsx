import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

import useStyles from "./styles";

const CommentSection = ({ post }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
    setComments(newComments);
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(': ')[0]}</strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a Comment</Typography>
            <TextField
              fullWidth minRows={4}
              variant='outlined'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)} />
            <Button style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection;