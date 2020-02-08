import { observable, action } from 'mobx';
import questions from '../../data/questions.json';
import Question, { QuestionInit } from '../../types/Question';

class TestingStore {
  @observable questions: Question[] =
    questions.questions.map((question: QuestionInit): Question => ({
      ...question,
      selectedAnswer: '-1',
    }));

  @action
  setAnswer(answer: string): void {
    this.questions[this.activeQuestionIndex].selectedAnswer = answer;
  }

  @observable activeQuestionIndex = 0;

  @action
  setActiveQuestionIndex(activeQuestion: number): void {
    this.activeQuestionIndex = activeQuestion;
  }

  @action
  nextQuestion(): void {
    this.activeQuestionIndex += 1;
  }

  @action
  previousQuestion(): void {
    this.activeQuestionIndex -= 1;
  }

  get activeQuestion(): Question {
    return this.questions[this.activeQuestionIndex];
  }

  hydrate(testingStore: TestingStore): void {
    this.setActiveQuestionIndex(testingStore.activeQuestionIndex);
  }
}

export default TestingStore;
