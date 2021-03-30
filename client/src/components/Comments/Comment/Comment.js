import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Avatar, Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import Moment from 'moment';
import ReactMarkdown from 'react-markdown';

import Replies from '../Replies.js';
import CommentForm from '../CommentForm/CommentForm.js';
import { likeComment } from '../../../actions/comments.js';
import useStyles from './styles';

const Comment = ({ comment }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const user = JSON.parse(localStorage.getItem('profile'));

    const [expanded, setExpanded] = useState(true);
    const [liked, setLiked] = useState(comment.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? true : false);
    const [likes, setLikes] = useState(comment.likes.length);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = () => {
        setExpanded(expanded ? false : true);
    };

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

    return (
        <div className={classes.commentMain}>
            {isSmall? null: <Avatar className={`${classes.purple} ${!expanded ? classes.avatarSmall : null}`} alt={comment.name} src={comment.imageUrl}>{comment.name.charAt(0)}</Avatar>}
            <div className={classes.commentContent}>
                <div className={classes.commentBar} onClick={handleChange}>
                    <div className={classes.commentInfo}>
                        <Typography>{comment.name}&nbsp;&nbsp;&nbsp;</Typography>
                        <Typography className={classes.commentPostTime} variant='subtitle2' color='textSecondary'>{`${Moment(comment.createdAt).fromNow()}`}</Typography>
                    </div>
                    <ExpandMoreIcon className={expanded ? classes.dropDownOpen : null} />
                </div>
                {expanded && 
                    <>
                    {isEdit ? 
                        <CommentForm setShowForm={setIsEdit} commentId={comment._id} /> :
                        <div className={classes.commentMessage}><ReactMarkdown>{comment.message}</ReactMarkdown></div>
                    }
                    <div>
                    <Button size='small' color='primary' disabled={!user?.result} onClick={() => {
                        setLikes(liked ? likes - 1 : likes + 1);
                        setLiked(!liked);
                        dispatch(likeComment(comment._id));
                    }}>
                        <Likes />
                    </Button>
                    <Button size='small' color='primary' disabled={!user?.result} onClick={() => {
                        setShowReplyForm(!showReplyForm);
                    }}>
                        {showReplyForm ? 'Cancel' : 'Reply'}
                    </Button>
                    {(user?.result?.googleId === comment.creator || user?.result?._id === comment.creator) &&
                        <Button size='small' color='primary' onClick={() => {
                            setIsEdit(!isEdit);
                        }}>
                            {isEdit ? 'Cancel' : 'Edit'}
                        </Button>
                    }
                    </div>
                    {showReplyForm && 
                        <CommentForm setShowForm={setShowReplyForm} parentPostId={comment.parentPost} parentId={comment._id} />
                    }
                    <Replies parentId={comment._id} />
                    </>
                }
            </div>
        </div>
    )
}

export default Comment;