import { observable, action } from 'mobx';
import average from '../../src/utils/average';
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

  getResult(): number {
    return average(this.questions, TestingStore.questionsReducer);
  }

  static questionsReducer(total: number, question: Question): number {
    const answerIndex = parseInt(question.selectedAnswer, 10);
    const answer = question.answers[answerIndex];
    return total + answer.value / questions.maxValue;
  }

  @action
  reset(): void {
    this.setActiveQuestionIndex(0);
    this.questions.forEach((question: Question): void => {
      question.selectedAnswer = '-1';
    });
  }

  hydrate(testingStore: TestingStore): void {
    this.setActiveQuestionIndex(testingStore.activeQuestionIndex);
  }
}

export default TestingStore;
