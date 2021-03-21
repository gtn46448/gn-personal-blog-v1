import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Button, Typography, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Moment from 'moment';

import Comments from '../Comments/Comments.js';
import { getPosts, likePost } from '../../actions/posts.js';
import useStyles from './styles';

const FullPost = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentId = location.pathname.replace('/post/', '');
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPosts());
    },[]);

    const post = useSelector((state) => state.posts).filter((post) => post._id === currentId)[0];
    const classes = useStyles();

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    if(!post) {
        return (
            <Card className={classes.card}>
                <div className={classes.mediaLoad}>
                    <CircularProgress />
                </div>
                <div className={classes.contentLoad}></div>
            </Card>
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
            <div className={classes.overlay3}>
                {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                        <Button style={{color: 'white'}} size='small' component={Link} to={`/create/${post._id}`}>
                            <MoreHorizIcon fontSize='default' />
                        </Button>
                    )}
            </div>
            <div className={classes.postHeader}>
                <div>
                    <Typography variant='h5'>{post.title}</Typography>
                    <div className={classes.tags}>
                        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                </div>
                <Button size='small' color='primary' disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
            </div>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <div>
                <Comments />
            </div>
        </Card>
    )
}

export default FullPost;