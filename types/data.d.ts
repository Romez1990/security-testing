import { QuestionInit } from './Question';

declare module '../data/questions.json' {
  export default interface Questions {
    maxValue: number;
    questions: QuestionInit[];
  }
}
