import React from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Auth = () => {

  const classes = useStyles();
  const isSignup = false;

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        {/* div with elevation effect */}
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <LockOutlinedIcon />
          <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <TextField
                      name='firstName'
                      label='First Name'
                      handleChange={handleChange}
                      autoFocus xs={6} />
                  </>
                )
              }
            </Grid>
          </form>

        </Paper>
      </Container>
    </div>
  );
}

export default Auth;