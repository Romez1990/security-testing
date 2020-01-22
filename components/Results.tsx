import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

interface Props {
  result: number;

  restart(): void;
}

function Results({ result, restart }: Props) {
  const resultPercent = Math.round(result * 100);

  return (
    <div>
      <Typography>
        Уровень безопасности вашей организации составляет {resultPercent}%
      </Typography>
      <Button onClick={restart}>Начать сначала</Button>
    </div>
  );
}

export default Results;
