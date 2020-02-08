import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step from './Step';
import useTestingStore from '../../store/testing/useTestingStore';

const useStyles = makeStyles(({ spacing }: Theme) => createStyles({
  buttons: {
    marginBottom: spacing(2),
  },
  button: {
    marginRight: spacing(1),
  },
}));

function Stepper(): JSX.Element {
  const testingStore = useTestingStore();

  function previousQuestion(): void {
    testingStore.previousQuestion();
  }

  function nextQuestion(): void {
    testingStore.nextQuestion();
  }

  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          disabled={testingStore.activeQuestionIndex === 0}
          onClick={previousQuestion}
        >
          Назад
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={testingStore.activeQuestion.selectedAnswer === '-1'}
          onClick={nextQuestion}
        >
          {testingStore.activeQuestionIndex === testingStore.questions.length - 1
            ? 'Завершить'
            : 'Вперёд'}
        </Button>
        <Typography display="inline">
          {testingStore.activeQuestionIndex + 1}/{testingStore.questions.length}
        </Typography>
      </div>
      <Step />
    </Fragment>
  );
}

export default observer(Stepper);
