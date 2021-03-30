import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const altTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    secondary: {
      main: '#BA2B26',
    },
  },
}));

export default altTheme;