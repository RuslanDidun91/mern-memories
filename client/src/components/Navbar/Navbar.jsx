import React from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";



const NavBar = () => {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(user);

  useEffect(() => {
    const token = user?.token
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({type:'LOGOUT'});
    navigate('/');
    setUser(null);
  }

  return (
    <div>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>

          <Typography component={Link} to='/'
            className={classes.heading}
            variant='h2'
            align='center'>Memories</Typography>
          <img className={classes.image} src={memories} alt="memories" height='60' />
        </div>
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