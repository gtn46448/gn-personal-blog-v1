import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: '0',
    },
  },
  commentMain: {
    margin: '20px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonSubmit: {
    marginBottom: 10,
    marginLeft: theme.spacing(1),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));