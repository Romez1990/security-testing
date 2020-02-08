import React from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import MainLayout from '../layouts/MainLayout';

function IndexPage(): JSX.Element {
  const router = useRouter();

  return (
    <MainLayout>
      Тестирование информационной безопасности
      <br />
      <br />
      <Button
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
