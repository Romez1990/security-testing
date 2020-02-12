import { QuestionInit } from '../types/Question';

declare module './questions.json' {
  export default interface Questions {
    maxValue: number;
    questions: QuestionInit[];
  }
}
