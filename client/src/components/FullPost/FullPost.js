import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Moment from 'moment';

import { getPost } from '../../actions/posts.js'
import useStyles from './styles';

const FullPost = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    // const currentId = useSelector((state) => state.currentId);
    const currentId = location.pathname.replace('/post/', '');
    console.log(currentId);

    useEffect(() => {
        dispatch(getPost(currentId));
    }, []);

    const post = useSelector((state) => state.posts).filter((post) => post._id === currentId)[0];
    const classes = useStyles();
    console.log(useSelector((state) => state.posts));

    if(!post) {
        return (
            <Card>404 not found</Card>
        )
    }

    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h3'>{post.title}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Typography variant='h6'>{Moment(post.createdAt).fromNow() + ' | ' + post.name}</Typography>
            </div>
            <div>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography  variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
        </Card>
    )
}

export default FullPost;