import React, { ChangeEvent } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useTestingStore from '../../store/testing/useTestingStore';

function Step(): JSX.Element {
  const testingStore = useTestingStore();

  function answerChange(event: ChangeEvent<HTMLInputElement>): void {
    testingStore.setAnswer((event.target as HTMLInputElement).value);
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{testingStore.activeQuestion.text}</FormLabel>
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
