import React from 'react'
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import Comment from './Comment/Comment.js';

const Replies = ({ parentId }) => {
    const classes = useStyles();

    const comments = useSelector((state) => state.comments.filter(comment => comment.parentComment === parentId));

    return(
        <Grid className={classes.repliesContainer} container>
            {
                comments.map((comment) => (
                    <Grid key={comment._id} item xs={12}>
                        <Comment comment={comment} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Replies;
