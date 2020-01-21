import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#19857b',
      dark: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {
    },
  },
});

export default theme;
