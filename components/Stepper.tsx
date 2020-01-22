import React, { Fragment, useState } from 'react';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step from './Step';
import questions from '../data/questions.json';

interface Props {
  onResult(result: number): void;
}

const useStyles = makeStyles(({ spacing }: Theme) => createStyles({
  buttons: {
    marginBottom: spacing(2),
  },
  button: {
    marginRight: spacing(1),
  },
}));

// index is question index, value is index of answer
const answers: string[] = [];

function getAnswer(questionIndex: number) {
  return answers[questionIndex] ?? 'null';
}

function saveAnswer(questionIndex: number, answerIndex: string) {
  answers[questionIndex] = answerIndex;
}

function getResult() {
  let totalValue = 0;
  for (let i = 0; i < questions.length; ++i) {
    const question = questions[i];
    const answerIndex = answers[i];
    const answer = question.answers[parseInt(answerIndex)];
    totalValue += answer.value;
  }
  const maxTotalValue = questions.length * 10;
  return totalValue / maxTotalValue;
}

function Stepper({ onResult }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [answer, setAnswer] = useState<string>('null');

  const activeQuestion = questions[activeStep];

  function nextStep() {
    setActiveStep(activeStep => {
      const nextStep = activeStep + 1;
      if (nextStep === questions.length) {
        onResult(getResult());
        return activeStep;
      }
      saveAnswerAndGetNext(nextStep);
      return nextStep;
    });
  }

  function previousStep() {
    setActiveStep(activeStep => {
      const previousStep = activeStep - 1;
      saveAnswerAndGetNext(previousStep);
      return previousStep;
    });
  }

  function saveAnswerAndGetNext(nextStep: number) {
    setAnswer(answer => {
      saveAnswer(activeStep, answer);
      return getAnswer(nextStep);
    });
  }

  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          disabled={activeStep === 0}
          onClick={previousStep}
        >
          Назад
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={answer === 'null'}
          onClick={nextStep}
        >
          {activeStep === questions.length - 1 ? 'Завершить' : 'Вперёд'}
        </Button>
        <Typography
          display="inline">{activeStep + 1}/{questions.length}</Typography>
      </div>
      <Step question={activeQuestion} answer={answer} setAnswer={setAnswer} />
    </Fragment>
  );
}

export default Stepper;
