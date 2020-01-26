import { Store } from 'redux';
import Question from '../src/Question';

declare module 'next' {
  interface NextPageContext {
    store: Store;
  }
}

declare module '../data/questions.json' {
  type questions = Question[];
  export default questions;
}
