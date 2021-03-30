import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, ButtonBase, Avatar, useMediaQuery } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import decode from 'jwt-decode';

import iconFull from '../../resources/blogn-full.svg';
import iconXSmall from '../../resources/blogn-xs.svg';

import { LOGOUT } from '../../constants/actionTypes.js';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));

    const logout = () => {
        dispatch({ type: LOGOUT });

        history.push('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <ButtonBase component={Link} to='/' className={classes.logo} variant="h2" align="center">
            <img src={isXSmall ? iconXSmall : iconFull} height="50" />
            </ButtonBase>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        {isSmall ? null : <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>}
                        <Button variant="contained" color="secondary" onClick={logout}>Log Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Log In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
