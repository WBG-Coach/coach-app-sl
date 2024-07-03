import {Answer} from './answer';

export type Question = {
  id: string;
  title: string;
  scale: number;
  description: string;
  tooltip_data: string;
  competence_id: string;

  answers?: Answer[];
};

export interface QuestionWithSuggestions extends Partial<Question> {
  suggestionDescription: string;
  answerAverage: number;
  suggestions: string[];
}
