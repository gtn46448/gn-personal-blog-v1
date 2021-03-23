import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '70vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  mediaLoad: {
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  contentLoad: {
    height: '50vh',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    height: '70vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    height: '67vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    color: 'white',
  },
  overlay3: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  postHeader: {
    display: 'flex',
    margin: '15px 20px 0 20px',
    justifyContent: 'space-between',
  },
  message: {
    fontFamily: '\'roboto\', sans-serif',
    lineHeight: '1.5',
  },
  tags: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});