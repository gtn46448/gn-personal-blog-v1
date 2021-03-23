import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Avatar, Grid, Paper, CircularProgress } from '@material-ui/core';
import FileBase  from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';
import { createComment, updateComment, getComments } from '../../../actions/comments.js';

const CommentForm = ({ parentPostId, parentId, commentId, setCommentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [postData, setPostData] = useState({ message: '' });
    
    const user = JSON.parse(localStorage.getItem('profile'));

    const comment = useSelector((state) => state.comments).filter((comment) => comment._id === commentId)[0];

    useEffect(() => {
        if(comment) {
            setPostData(comment);
        }
    }, [comment])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(commentId) {
            dispatch(updateComment( commentId, { ...postData, parentPost: parentPostId, parentComment: parentId, name: user?.result?.name }));
        } else {
            dispatch(createComment({ ...postData, parentPost: parentPostId, parentComment: parentId, name: user?.result?.name }));
        }
        clear();
    };

    const clear = () => {
        // setCurrentId(null);
        setPostData({ message: '' });
    };

    if(!user?.result?.name) {
        return(
            <Typography variant="h6" align="center">
                Log in or sign up to comment on posts.
            </Typography>
        )
    }

    return(
        <Grid container className={classes.commentMain}>
            <Grid item>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            </Grid>
            <Grid item xs={11}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <TextField name="message" variant="outlined" label="Add a public comment..." fullWidth multiline rows={2} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit">Submit</Button>
                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear}>Clear</Button>
                </form>
            </Grid>
        </Grid>
        
    );
}

export default CommentForm;