import React from 'react';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => createStyles({
  title: {
    flexGrow: 1,
    font: '500 1.25rem / 1.6 Roboto, Helvetica, Arial, sans-serif',
    letterSpacing: '0.0075em',
  },
}));

function AppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Container maxWidth="md">
          <Typography className={classes.title} variant="h1">
            Тестирование Безопасности
          </Typography>
        </Container>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
