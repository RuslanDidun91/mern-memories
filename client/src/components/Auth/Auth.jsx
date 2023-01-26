import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./input";
import { AUTH } from '../../constants/actionTypes';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signIn, signUp} from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

  //varaibles need to be tracked
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));

    }
  }

  const handleChange = (e) => {
setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((signUp) => !signUp);
    handleShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }


  const googleError = (err) => {
    console.log(err);
  }

  return (
    <Container component='main' maxWidth='xs'>
      {/* div with elevation effect */}
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName' label='First Name'
                  handleChange={handleChange} autoFocus half />

                <Input
                  name='firstName' label='First Name'
                  handleChange={handleChange} half />
              </>)}
            <Input
              name='email' label='Email Address'
              handleChange={handleChange} type='email' />

            <Input
              name='password' label='password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword} />
            {isSignup &&
              <Input name='confirmPassword' label='Repeat Password'
                handleChange={handleChange} type='password' />}
          </Grid>
          <Button type="submit" fullWidth variant="contained"
            color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleError} />

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;