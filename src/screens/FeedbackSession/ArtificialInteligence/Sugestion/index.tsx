import React from 'react';
import Page from '../../../../components/Page';
import {useTranslation} from 'react-i18next';
import {Box, HStack, ScrollView, Text, VStack} from 'native-base';
import Button from '../../../../components/Button';
import {useLocation, useNavigate} from 'react-router-native';
import PathRoutes from '../../../../routers/paths';
import {AnswerWithSuggestions} from '../../../../types/answer';
import Icon from '../../../../components/Icon';

const FeedbackAISuggestion = () => {
  const {
    state: {answer, ...state},
  } = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();

  /*   const answer: AnswerWithSuggestions = {
    question: {
      title: 'The students are not working',
      description: 'In the 1st part of the class',
    } as Question,
    id: '2',
    question_id: 'a235ad6f-382b-4865-94f7-ac5e53736ec6',
    value: '3',
    suggestionDescription: `That was the lowest competence rated during the last class observation. This should be a good competence for the teacher improve. Due to the teacher history, this competence should be focused once they didn't improve for the last 3 sessions.`,
    suggestions: [
      'Have some activities during explanations',
      'Have some activities during explanations',
      'Have some activities during explanations',
    ],
  }; */

  return (
    <Page back title={t('feedbackSession.title')}>
      <ScrollView>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          AI Suggestion
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          Our AI analysed your evaluation and suggested some actions of
          improvement
        </Text>

        <VStack
          mt={6}
          w={'full'}
          borderWidth={1}
          rounded={'8px'}
          borderColor={'gray.200'}>
          <HStack
            w="full"
            bg={'violet.100'}
            roundedTopLeft={'8px'}
            roundedTopRight={'8px'}
            px={4}
            py={2}>
            <Text fontSize={'TMD'} fontWeight={700} color={'gray.700'}>
              Suggested question
            </Text>
          </HStack>

          <VStack w={'full'} px={4} py={4}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {answer.question?.title}
            </Text>

            <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
              {answer.question?.description}
            </Text>

            <HStack alignItems="center" mt="4px">
              <Icon name="star-solid" color="#576375" size={16} />
              <Text ml="2px" fontSize="16px" color="#576375">
                {answer.value}
              </Text>
            </HStack>

            <Text mt={4} fontSize={'TSM'} fontWeight={400} color={'gray.700'}>
              {answer.suggestionDescription}
            </Text>

            <Box w={'full'} my={4} h={'1px'} bg={'gray.200'} />

            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              Actions of improvement
            </Text>

            <VStack space={0}>
              {(answer as AnswerWithSuggestions).suggestions.map(
                (suggestion, key) => (
                  <Text color={'gray.700'} key={key}>
                    {'\u25CF'} {suggestion}
                  </Text>
                ),
              )}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <VStack py={3} rounded={'8px'}>
        <Button
          bg={'violet.200'}
          onPress={() => {
            navigate(PathRoutes.feedbackSession.form, {
              replace: true,
              state: {
                answerId: answer.id,
                ...state,
              },
            });
          }}>
          Select suggested
        </Button>
        <Button
          variant={'outlined'}
          onPress={() =>
            navigate(PathRoutes.feedbackSession.chooseCompetence, {
              replace: true,
              state: {...state, AIAnswer: answer.id},
            })
          }>
          Select other
        </Button>
      </VStack>
    </Page>
  );
};

export default FeedbackAISuggestion;
