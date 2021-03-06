import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, CircularProgress } from '@material-ui/core';
import FileBase  from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost, getPosts } from '../../actions/posts.js'

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [postData, setPostData] = useState({ title: '', description: '', message: '', tags: '', selectedFile: '' });
    
    const currentId = location.pathname.replace('/create/','').replace('/create','');
    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        dispatch(getPosts());
    }, []);

    const post = useSelector((state) => state.posts).filter((post) => post._id === currentId)[0];

    useEffect(() => {
        if(post) {
            setPostData(post);
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId) {
            dispatch(updatePost( currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
        history.push('/');
    };

    const clear = () => {
        // setCurrentId(null);
        setPostData({ title: '', description: '', message: '', tags: '', selectedFile: '' });
    };

    if(user?.result?.accountType !== 'creator') {
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                You do not have permission to create or edit posts.
                </Typography>
            </Paper>
        )
    }

    if(!post && currentId) {
        return (
            <CircularProgress />
        )
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit' : 'Create'} a Post</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}><FileBase type="file" multiple = {false} onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;