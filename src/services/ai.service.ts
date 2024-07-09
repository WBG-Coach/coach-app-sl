import axios from 'axios';
import {Answer, AnswerWithSuggestions} from '../types/answer';
import {API_URL} from '@env';
import {StorageService} from './storage.service';
import {School} from '../types/school';
import {CompetenceAnswers} from '../types/competence';

export const AIService = {
  generateSuggestion: async (
    answer: Answer,
  ): Promise<AnswerWithSuggestions> => {
    const currentSchool = await StorageService.getCurrentSchool();

    return (
      await axios.post(`${API_URL}/generate-suggestion`, answer, {
        headers: {token: currentSchool?.schoolKey},
      })
    ).data;
  },

  selectAnswer: async (params: CompetenceAnswers[]): Promise<Answer> => {
    const currentSchool = await StorageService.getCurrentSchool();

    return (
      await axios.post(
        `${API_URL}/select-answer`,
        {competences: params, schoolId: currentSchool?.id},
        {
          headers: {token: currentSchool?.schoolKey},
        },
      )
    ).data;
  },
};
