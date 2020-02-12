import { IncomingMessage } from 'http';
import { observable, action } from 'mobx';
import { getCookie, setCookie } from '../../src/coookies';
import average from '../../src/utils/average';
import questions from '../../data/questions.json';
import categories from '../../data/categories.json';
import Question, { QuestionInit } from '../../types/Question';
import Category from '../../types/Category';

type CategoriesToQuestions = { [key: string]: Question[] };

const fillAnswers = (question: QuestionInit): Question => ({
  ...question,
  selectedAnswer: '-1',
});

class TestingStore {
  @observable questions: Question[] = questions.questions.map(fillAnswers);

  @action
  setQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  @action
  setAnswer(answer: string): void {
    this.questions[this.activeQuestionIndex].selectedAnswer = answer;
    this.saveQuestions();
  }

  saveQuestions(): void {
    const questionsJson = JSON.stringify(this.questions);
    setCookie('questions', questionsJson);
  }

  @action
  load(req?: IncomingMessage): void {
    const questionsJson = getCookie('questions', req);
    this.questions =
      typeof questionsJson !== 'undefined'
        ? JSON.parse(questionsJson)
        : questions.questions.map(fillAnswers);
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

  get results(): Map<Category, number> {
    const categoriesToQuestions = this.questions.reduce<CategoriesToQuestions>(
      (categories: CategoriesToQuestions, question: Question) => {
        if (!(question.category in categories))
          categories[question.category] = [];
        categories[question.category].push(question);
        return categories;
      },
      {},
    );
    const results = new Map<Category, number>();
    Object.entries(categoriesToQuestions).forEach(
      (entry: [string, Question[]]): void => {
        const categoryName = entry[0];
        const questions = entry[1];
        const category = (categories as any)[categoryName];
        if (typeof category === 'undefined')
          throw new Error(`category ${categoryName} not found`);
        results.set(category, average(questions, TestingStore.questionsReducer));
      },
    );
    return results;
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
    this.setQuestions(testingStore.questions);
  }
}

export default TestingStore;
