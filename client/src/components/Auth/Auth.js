import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signUp, signIn } from '../../actions/auth.js'
import { AUTH } from '../../constants/actionTypes.js'
import Icon from './Icon'
import Input from './Input.js';
import useStyles from './styles.js';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signUp(formData, history));
          } else {
            dispatch(signIn(formData, history));
          }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const googleSuccess= async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: {result, token} })

            history.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    const googleFailure= (error) => {
        console.error(error)
        console.log('Google signin was failed try again')
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.Avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Log In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange = {handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange = {handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange = {handleChange} type="email" />
                        <Input name="password" label="Password" handleChange = {handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <Input name = "confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    {
                        !isSignUp && (
                            <GoogleLogin 
                                clientId="753775859921-4eks4guhnm75osrr4o6bk04b4ecuflia.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disable={renderProps.disable} startIcon={<Icon />} variant="contained">
                                        Google Sign in
                                    </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                        )
                    }
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account yet? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
