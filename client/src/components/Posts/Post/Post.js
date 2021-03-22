import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import Moment from 'moment';

import useStyles from './styles';

const Post = ({ post }) => {
    const classes = useStyles();

    return(
        <Card className={classes.card} component={Link} to={`/post/${post._id}`}>
            <div>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.title}</Typography>
                    <Typography variant='body2'>{post.name}</Typography>
                    <Typography variant='body2'>{`${Moment(post.createdAt).fromNow()} · ${post.likes.length} Likes`}</Typography>
                </div>
                <CardContent>
                    <Typography variant='body1' component='p'>{post.message.length > 150 ? `${post.message.slice(0,97)}...` : post.message }</Typography>
                </CardContent>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
        </Card>

    );
}

export default Post;