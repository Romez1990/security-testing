import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import grey from '@material-ui/core/colors/grey';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2c6fd1',
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#333',
    },
    background: {
      default: grey[900],
    },
  },
});

export {
  lightTheme,
  darkTheme,
};
