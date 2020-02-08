import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import useTestingStore from '../../store/testing/useTestingStore';

function Results(): JSX.Element {
  const testingStore = useTestingStore();

  const result = testingStore.getResult();

  function toPercent(number: number): string {
    const percent = Math.round(number * 100);
    return `${percent}%`;
  }

  const router = useRouter();

  async function restart(): Promise<void> {
    testingStore.reset();
    await router.push('/testing');
  }

  return (
    <div>
      <Typography>
        Уровень безопасности вашей организации составляет {toPercent(result)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={restart}
      >Начать сначала</Button>
    </div>
  );
}

export default Results;
