import React, { Fragment, useState } from 'react';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step from './Step';
import questions from '../data/questions.json';

const useStyles = makeStyles(({ spacing }: Theme) => createStyles({
  buttons: {
    marginBottom: spacing(2),
  },
  button: {
    marginRight: spacing(1),
  },
}));

function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [answer, setAnswer] = useState<string>('null');

  const activeQuestion = questions[activeStep];

  function nextStep() {
    setActiveStep(activeStep => {
      setAnswer('null');
      return ++activeStep;
    });
  }

  function previousStep() {
    setActiveStep(activeStep => --activeStep);
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
