import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Button, Typography, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Moment from 'moment';
import ReactMarkdown from 'react-markdown';

import Comments from '../Comments/Comments.js';
import { getPost, likePost } from '../../actions/posts.js';
import useStyles from './styles';

const FullPost = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const currentId = location.pathname.replace('/post/', '');
    const user = JSON.parse(localStorage.getItem('profile'));
    const [post, setPost] = useState(useSelector((state) => state.posts).filter((post) => post._id === currentId)[0]);
    const [liked, setLiked] = useState(404);
    const [likes, setLikes] = useState(post?.likes.length);

    useEffect(() => {
        getPost(currentId).then((response) => {
            setPost(response)
            setLiked(response.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? true : false)
            setLikes(response.likes.length);
        });
    },[]);

    const Likes = () => {
        console.log(`${liked} ${post.likes}`);
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
                <Button size='small' color='primary' disabled={!user?.result || liked === 404} onClick={()=> {
                        setLikes(liked ? likes - 1 : likes + 1);
                        setLiked(!liked);
                        dispatch(likePost(currentId));
                    }}
                >
                    <Likes />
                </Button>
            </div>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'><ReactMarkdown>{post.message}</ReactMarkdown></Typography>
            </CardContent>
            <div>
                <Comments />
            </div>
        </Card>
    )
}

export default FullPost;