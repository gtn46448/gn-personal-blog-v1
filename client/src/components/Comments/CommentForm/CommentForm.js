import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Avatar, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createComment, updateComment } from '../../../actions/comments.js';

const CommentForm = ({ parentPostId, parentId, commentId, setShowForm }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isReply = (parentPostId !== parentId) ? true : false;
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const [postData, setPostData] = useState({ message: '' });
    
    const user = JSON.parse(localStorage.getItem('profile'));

    const comment = useSelector((state) => commentId ? state.comments.find((comment) => comment._id === commentId) : null );

    useEffect(() => {
        if(comment) {
            setPostData(comment);
        }
    }, [comment])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(postData.message === '') return;
        
        if(commentId) {
            dispatch(updateComment( commentId, { ...postData, name: user?.result?.name, imageUrl: user?.result?.imageUrl }));
        } else {
            dispatch(createComment({ ...postData, parentPost: parentPostId, parentComment: parentId, name: user?.result?.name, imageUrl: user?.result?.imageUrl }));
        }
        clear();
        if(isReply || commentId) setShowForm(false)
    };

    const clear = () => {
        // setCurrentId(null);
        setPostData({ message: '' });
    };

    if(!user?.result?.name) {
        return(
            <Typography gutterBottom={true} variant="h6" align="center">
                Log in or sign up to comment on posts.
            </Typography>
        )
    }

    return(
        <div className={commentId ? classes.edit : classes.commentMain}>
            {!commentId && !isSmall ?
                <div className={classes.commentIcon}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                </div> : null
            }
            <div className={classes.commentContent}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <TextField name="message" variant="outlined" label={`Add a public ${isReply ? 'reply' : 'comment'}...`} fullWidth multiline value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit">Submit</Button>
                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear}>Clear</Button>
                </form>
            </div>
        </div>
    );
}

export default CommentForm;