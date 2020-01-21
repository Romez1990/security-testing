import Question from '../src/Question';

declare module '../data/questions.json' {
  type questions = Question[];
  export default questions;
}
