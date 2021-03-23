import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import Comment from './Comment/Comment.js';

const Replies = ({parentId}) => {
    const classes = useStyles();

    const comments = useSelector((state) => state.comments.find((comment) => comment.parentComment === parentId))
    // console.log(!comments.length ? true : false);

    return(
        !comments.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    comments.map((comment) => (
                        <Grid key={comment._id} item xs={12}>
                            <Comment comment={comment} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Replies;
