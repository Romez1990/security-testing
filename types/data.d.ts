import { QuestionInit } from './Question';
import Category from './Category';

declare module '../data/questions.json' {
  export default interface Questions {
    maxValue: number;
    questions: QuestionInit[];
  }
}

declare module '../data/categories.json' {
  export declare type categories = Category[];
}
