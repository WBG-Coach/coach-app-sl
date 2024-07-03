import React, {useEffect} from 'react';
import Page from '../../../../components/Page';
import {useTranslation} from 'react-i18next';
import {Center, Text, VStack} from 'native-base';
import {useLocation, useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../../routers/paths';

const FeedbackAILoading = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigate(PathRoutes.feedbackSession.ai.suggestion, {
        state,
      });
    }, 2000);
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
