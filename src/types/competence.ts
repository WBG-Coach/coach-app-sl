import {Question} from './question';

export type Competence = {
  id: string;
  title: string;
  questions: Question[];
};

export type CompetenceAnalytics = {
  id: string;
  title: string;
  questionsScale: number;
  questions: Question[];
  sumAnswers: number;
  totalQuestions: number;
};
