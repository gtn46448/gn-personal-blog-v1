import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Button, Typography, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Moment from 'moment';
import ReactMarkdown from 'react-markdown';

import CommentForm from '../Comments/CommentForm/CommentForm.js';
import Replies from '../Comments/Replies.js';
import { getPost, likePost, deletePost } from '../../actions/posts.js';
import { getComments } from '../../actions/comments.js';
import useStyles from './styles';

const FullPost = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const currentId = location.pathname.replace('/post/', '');
    const user = JSON.parse(localStorage.getItem('profile'));
    const [post, setPost] = useState(useSelector((state) => state.posts).filter((post) => post._id === currentId)[0]);
    const [liked, setLiked] = useState(post?.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? true : false);
    const [likes, setLikes] = useState(post?.likes.length);

    useEffect(() => {
        dispatch(getComments(currentId));
        if(!post) {
            getPost(currentId).then((response) => {
                setPost(response)
                setLiked(response.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? true : false)
                setLikes(response.likes.length);
            });
        }
    },[]);

    const Likes = () => {
        let likeCount = likes || 0;
        if (likeCount > 0) {
            return liked
                ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likeCount > 2 ? `You and ${likeCount - 1} others` : `${likeCount} like${likeCount > 1 ? 's' : ''}` }</>
                ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</>
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
                    <>
                        <Button style={{color: 'white'}} size='small' component={Link} to={`/create/${post._id}`}>
                            <EditIcon fontSize='default' />
                            &nbsp;Edit
                        </Button>
                        <Button style={{color: 'white'}} size='small' onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize='default' />
                            &nbsp;Delete
                        </Button>
                    </>
                )}
            </div>
            <div className={classes.postHeader}>
                <div>
                    <Typography variant='h4'>{post.title}</Typography>
                    <div className={classes.tags}>
                        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                </div>
                <Button size='small' color='primary' disabled={!user?.result} onClick={()=> {
                    setLikes(liked ? likes - 1 : likes + 1);
                    setLiked(!liked);
                    dispatch(likePost(currentId));
                }}>
                    <Likes />
                </Button>
            </div>
            <CardContent>
                <div className={classes.message}><ReactMarkdown>{post.message}</ReactMarkdown></div>
            </CardContent>
            <div>
                <CommentForm parentPostId={post._id} parentId={post._id} />
                <Replies parentId={post._id} />
            </div>
        </Card>
    )
}

export default FullPost;