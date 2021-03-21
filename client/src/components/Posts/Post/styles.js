import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    textDecoration: 'none',
  },
  overlay: {
    position: 'absolute',
    top: '12px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    // justifyContent: 'space-between',
    margin: '0 0 20px 20px',
  },
  title: {
    padding: '10px 16px',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'space-between',
  },
});