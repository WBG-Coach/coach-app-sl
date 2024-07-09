import React, {useState} from 'react';
import {
  Text,
  VStack,
  HStack,
  TextArea,
  useTheme,
  ScrollView,
  View,
} from 'native-base';
import ImagePickerModal from '../../../components/ImagePickerModal';
import {SessionService} from '../../../services/session.service';
import {useLocation, useNavigate} from 'react-router-native';
import {ImageService} from '../../../services/image.service';
import ImageCard from '../../../components/ImageCard';
import PathRoutes from '../../../routers/paths';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import Page from '../../../components/Page';
import {AnswerWithSuggestions} from '../../../types/answer';
import {useWindowDimensions} from 'react-native';

const FeedbackSessionForm: React.FC = () => {
  const [images, setImages] = useState<
    {name: string; value: string; created_at: number}[]
  >([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const {t} = useTranslation();
  const {
    state: {sessionId, answer},
  }: {state: {sessionId: string; answer: AnswerWithSuggestions}} =
    useLocation();
  const navigate = useNavigate();
  const [actions, setActions] = useState('');
  const [submittedWithError, setSubmittedWithError] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const finishCoachSession = async () => {
    setLoading(true);
    if (actions) {
      const feedbackId = await SessionService.createLocalFeedback(
        {
          answer_id: answer.id,
          value: actions,
        },
        sessionId,
      );

      await Promise.all(
        images.map(
          async image =>
            await ImageService.saveNewImage(
              image.name,
              image.value,
              feedbackId,
            ),
        ),
      );

      navigate(PathRoutes.feedbackSession.completed, {replace: true});
    } else {
      setSubmittedWithError(true);
    }
    setLoading(false);
  };

  const PAGE_WIDTH = useWindowDimensions().width;
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH / 2,
  } as const;

  return (
    <Page back title={t('feedbackSession.title')}>
      <VStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {t('feedback.form.title')}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {t('feedback.form.subtitle')}
          </Text>

          <VStack mt={7} space={0}>
            <Text fontSize={'18px'} fontWeight={700} color={'gray.700'}>
              {answer?.question?.title}
            </Text>
            <Text fontSize={'LMD'} mt={4} fontWeight={500} color={'gray.700'}>
              {t('feedback.form.actionsToImprove')}
            </Text>
            <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {t('feedback.form.describeActions')}
            </Text>

            <TextArea
              mt={2}
              value={actions}
              isInvalid={submittedWithError}
              autoCompleteType=""
              placeholder={t('feedback.form.textAreaPlaceholder')}
              onChangeText={setActions}
            />

            {answer.suggestions && Array.isArray(answer.suggestions) && (
              <VStack>
                <HStack mt={'5'}>
                  <Icon
                    name={'sparkle'}
                    color={theme.colors.violet['200'] as string}
                  />
                  <Text
                    ml={1}
                    fontSize={'TSM'}
                    fontWeight={400}
                    color={'gray.700'}>
                    Actions suggested by AI
                  </Text>
                </HStack>

                {/*   <Carousel
                  {...baseOptions}
                  loop={false}
                  style={{width: '100%'}}
                  data={answer.suggestions}
                  pagingEnabled={true}
                  onSnapToItem={index => console.log('current index:', index)}
                  renderItem={({index}) => (
                    <View
                      bg={'gray.100'}
                      borderRadius={'8px'}
                      flex={1}
                      px={2}
                      py={4}></View>
                  )}
                /> */}
              </VStack>
            )}
          </VStack>

          <VStack>
            <HStack alignItems={'center'} mt={6}>
              <Text
                fontSize={'TXL'}
                flex={1}
                fontWeight={700}
                color={'gray.700'}>
                {t('feedback.form.uploadImage')}
              </Text>
              <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                {t('common.optional')}
              </Text>
            </HStack>

            <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {t('feedback.form.sendPicture')}
            </Text>

            <Button
              mt={2}
              variant={'outlined'}
              onPress={() => setShowImagePicker(true)}>
              <HStack>
                <Icon name={'image'} color={theme.colors.primary['200']} />
                <Text
                  ml={2}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'primary.200'}>
                  {t('feedback.form.uploadPhoto')}
                </Text>
              </HStack>
            </Button>

            <VStack flex={1} space={2} mt={6}>
              {images.map((image: any, index) => (
                <ImageCard
                  {...image}
                  key={index}
                  transformBase
                  handleDelete={() => {
                    const imageCopy = images;
                    imageCopy.splice(index, 1);
                    setImages(JSON.parse(JSON.stringify(imageCopy)));
                  }}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>

      <VStack pt={3} background={'white'} borderRadius={'8px 8px 0px 0px'}>
        <Button onPress={finishCoachSession} isLoading={loading}>
          {t('feedback.form.button')}
        </Button>
      </VStack>

      <ImagePickerModal
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        handleSelectImage={asset =>
          setImages([...images, {...asset, created_at: Date.now()}])
        }
      />
    </Page>
  );
};

export default FeedbackSessionForm;
