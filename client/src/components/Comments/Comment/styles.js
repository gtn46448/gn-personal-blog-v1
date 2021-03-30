import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  commentMain: {
    margin: '20px 0 0 20px',
    display: 'grid',
    gridTemplateColumns: '45px 1fr',
    gridColumnGap: '7px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridColumnGap: '0',
    },
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  commentBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20px',
    cursor: 'pointer',
  },
  commentInfo: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  commentPostTime: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  dropDownOpen: {
    transform: 'rotate(180deg)',
  },
  avatarSmall: {
    height: '30px',
    width: '30px',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  commentMessage: {
    fontFamily: '\'roboto\', sans-serif',
    lineHeight: '1.5',
    oveflowWrap: 'break-word',
    wordBreak: 'break-word',
    paddingRight: '10px',
  },
}));