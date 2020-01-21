import React, { ChangeEvent } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Question from '../src/Question';

interface Props {
  question: Question;
  answer: string;

  setAnswer(answer: string): void;
}

function Step({ question, answer, setAnswer }: Props) {
  function answerChange(event: ChangeEvent<HTMLInputElement>) {
    setAnswer((event.target as HTMLInputElement).value);
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{question.text}</FormLabel>
      <RadioGroup value={answer} onChange={answerChange}>
        {question.answers.map((answer, index) => (
          <FormControlLabel
            key={index}
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
