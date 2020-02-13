import React, { useEffect } from 'react';
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

  async function start(): Promise<void> {
    await router.push('/testing');
  }

  useEffect((): () => void => {
    document.addEventListener('keyup', onKeyPress);
    return (): void => document.removeEventListener('keyup', onKeyPress);
  }, []);

  async function onKeyPress(e: KeyboardEvent): Promise<void> {
    switch (e.key) {
      case 'Enter':
        await start();
        break;
    }
  }

  const classes = useStyles();

  return (
    <MainLayout>
      <Typography>Тестирование информационной безопасности</Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={start}
      >
        Начать тестирование
      </Button>
    </MainLayout>
  );
}

export default IndexPage;
