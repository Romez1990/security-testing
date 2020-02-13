import React from 'react';
import { useRouter } from 'next/router';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/styles/createStyles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MainLayout from '../layouts/MainLayout';

const useStyles = makeStyles(({ spacing }: Theme) => createStyles({
  button: {
    marginTop: spacing(1),
  },
}));

function IndexPage(): JSX.Element {
  const router = useRouter();

  const classes = useStyles();

  return (
    <MainLayout>
      <Typography>Тестирование информационной безопасности</Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={(): Promise<boolean> => router.push('/testing')}
      >
        Начать тестирование
      </Button>
    </MainLayout>
  );
}

export default IndexPage;
