import Answer from './Answer';

export interface QuestionInit {
  text: string;
  answers: Answer[];
}

export default interface Question extends QuestionInit {
  selectedAnswer: string;
}
