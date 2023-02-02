import React from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import useStyles from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from '../../constants/actionTypes';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

const NavBar = () => {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <div>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to="/" className={classes.brandContainer}>
          <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
          <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple}
                alt={user?.result.name}
                src={user?.result.picture}
              >
                {user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
              <Button variant='contained'
                className={classes.logout}
                color='secondary'
                onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;