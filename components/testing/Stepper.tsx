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
  elements: {
    marginRight: spacing(2),
  },
}));

function Stepper(): JSX.Element {
  const testingStore = useTestingStore();

  function previousQuestion(): void {
    testingStore.previousQuestion();
  }

  const router = useRouter();

  async function nextQuestion(): Promise<void> {
    if (testingStore.activeQuestionIndex === testingStore.questions.length - 1) {
      await router.push('/results');
      return;
    }

    testingStore.nextQuestion();
  }

  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.buttons}>
        <Button
          className={classes.elements}
          disabled={testingStore.activeQuestionIndex === 0}
          onClick={previousQuestion}
        >
          Назад
        </Button>
        <Typography className={classes.elements} display="inline">
          {testingStore.activeQuestionIndex + 1}/{testingStore.questions.length}
        </Typography>
        <Button
          className={classes.elements}
          variant="contained"
          color="primary"
          disabled={testingStore.activeQuestion.selectedAnswer === '-1'}
          onClick={nextQuestion}
        >
          {testingStore.activeQuestionIndex === testingStore.questions.length - 1
            ? 'Завершить'
            : 'Вперёд'}
        </Button>
      </div>
      <Step />
    </Fragment>
  );
}

export default observer(Stepper);
