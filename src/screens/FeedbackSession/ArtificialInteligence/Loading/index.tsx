import React, {useEffect, useState} from 'react';
import Page from '../../../../components/Page';
import {useTranslation} from 'react-i18next';
import {Center, Text, VStack} from 'native-base';
import {useLocation, useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../../routers/paths';
import {Answer, AnswerWithSuggestions} from '../../../../types/answer';
import {SessionService} from '../../../../services/session.service';
import {AIService} from '../../../../services/ai.service';

const FeedbackAILoading = () => {
  const navigate = useNavigate();
  const {
    state: {answerId, ...state},
  } = useLocation();
  const {t} = useTranslation();

  useEffect(() => {
    SessionService.getSessionAnswersGroupedByCompetence(state.sessionId).then(
      async competenceAnswers => {
        let answer: Answer;

        if (answerId) {
          answer = competenceAnswers.reduce((acc, item) => {
            if (!('id' in acc)) {
              const cAnswer = item.answers.find(
                answer => answer.id === answerId,
              );
              if (cAnswer) return cAnswer;
            }

            return acc;
          }, {} as Answer);
        } else {
          answer = await AIService.selectAnswer(competenceAnswers);
        }

        console.log(answer);

        AIService.generateSuggestion(answer).then(suggestion =>
          navigate(PathRoutes.feedbackSession.ai.suggestion, {
            state: {...state, answer: suggestion},
          }),
        );
      },
    );
  }, []);

  return (
    <Page back title={t('feedbackSession.title')}>
      <Center h={'full'}>
        <VStack>
          <Text
            fontSize={'LLG'}
            fontWeight={500}
            color={'gray.800'}
            mb={2}
            textAlign={'center'}>
            Processing suggestions...
          </Text>

          <Text
            fontSize={'TSM'}
            fontWeight={400}
            color={'gray.700'}
            textAlign={'center'}>
            The AI is thinking in a feedback, this may take some minutes
          </Text>
        </VStack>
      </Center>
    </Page>
  );
};

export default FeedbackAILoading;
