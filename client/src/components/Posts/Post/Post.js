import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';
// import { viewPost } from '../../../actions/viewPosts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

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

    return(
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/post/${post._id}`}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.title}</Typography>
                    <Typography variant='body2'>{Moment(post.createdAt).fromNow() + ' | ' + post.name}</Typography>
                </div>
                {/* <div className={classes.overlay2}>
                    {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                        <Button style={{color: 'white'}} size='small' onClick={()=>{setCurrentId(post._id)}}>
                            <MoreHorizIcon fontSize='default' />
                        </Button>
                    )}
                </div> */}
                <CardContent>
                    <Typography variant='body1' component='p'>{post.message}</Typography>
                </CardContent>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                {/* <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography> */}
                {/* <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary' disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
                        <Likes />
                    </Button>
                </CardActions> */}
            </CardActionArea>
        </Card>

    );
}

export default Post;