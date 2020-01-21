import React, { ReactNode } from 'react';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BaseLayout from './BaseLayout';
import AppBar from '../components/AppBar';

interface Props {
  title?: string;
  children: ReactNode;
}

const useStyles = makeStyles(({ spacing }: Theme) => createStyles({
  container: {
    marginTop: spacing(3),
  },
}));

function MainLayout({ title, children }: Props) {
  const classes = useStyles();

  return (
    <BaseLayout title={title}>
      <AppBar />
      <Container className={classes.container} maxWidth="md">
        {children}
      </Container>
    </BaseLayout>
  );
}

export default MainLayout;
