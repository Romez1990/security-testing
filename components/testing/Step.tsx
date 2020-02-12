import React, { ChangeEvent } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import useTestingStore from '../../store/testing/useTestingStore';

const useStyles = makeStyles(() => createStyles({
  question: {
    fontSize: '18px',
  },
}));

function Step(): JSX.Element {
  const testingStore = useTestingStore();

  function answerChange(event: ChangeEvent<HTMLInputElement>): void {
    testingStore.setAnswer((event.target as HTMLInputElement).value);
  }

  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <Typography className={classes.question}>{testingStore.activeQuestion.text}</Typography>
      <RadioGroup value={testingStore.activeQuestion.selectedAnswer} onChange={answerChange}>
        {testingStore.activeQuestion.answers.map((answer, index) => (
          <FormControlLabel
            key={answer.text}
            value={index.toString()}
            control={<Radio color="primary" />}
            label={answer.text}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Step;
