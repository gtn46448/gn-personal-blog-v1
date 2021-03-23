import React, { useState } from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails, Avatar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './styles';

const Comment = (comment) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);

    const handleChange = () => {
        setExpanded(expanded ? false : true);
      };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="comment-content"
            >
                <Typography className={classes.info}>User Name</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default Comment;

{/* <>
        <div className={classes.info}>Icon<Typography variant='subtitle1'>User Name</Typography></div>
        <div><Typography>posted date</Typography></div>
        <div>Content</div>
        <div>line</div><div>replies</div>
        </> */}