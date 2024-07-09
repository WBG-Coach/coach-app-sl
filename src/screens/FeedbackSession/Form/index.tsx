import React, {useState} from 'react';
import {
  Text,
  VStack,
  HStack,
  TextArea,
  useTheme,
  ScrollView,
  View,
  Center,
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
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

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
  const [selectedSuggests, setSelectedSuggests] = useState<string[]>([]);
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
    height: PAGE_WIDTH / 3,
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
                <HStack mt={5} mb={3}>
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

                <Carousel
                  {...baseOptions}
                  loop={false}
                  style={{width: '100%'}}
                  data={answer.suggestions.filter(
                    suggests => !selectedSuggests.includes(suggests),
                  )}
                  pagingEnabled={true}
                  renderItem={({item, index}) => (
                    <VStack
                      bg={'gray.100'}
                      borderRadius={'8px'}
                      mr={3}
                      px={2}
                      py={4}>
                      <HStack alignItems={'center'}>
                        <Text
                          fontSize={'TXS'}
                          flex={1}
                          fontWeight={400}
                          color={'gray.700'}>
                          Suggestion {selectedSuggests.length + index + 1}
                        </Text>

                        <TouchableOpacity
                          onPress={() =>
                            setSelectedSuggests(previous => [...previous, item])
                          }>
                          <HStack
                            bg={'gray.200'}
                            px={'2'}
                            py={1}
                            borderRadius={'500'}
                            alignItems={'center'}
                            space={1}>
                            <Icon name="plus" size={16} />
                            <Text
                              fontSize={'LSM'}
                              fontWeight={500}
                              color={'gray.800'}>
                              Select
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      </HStack>

                      <Text
                        fontSize={'TXS'}
                        fontWeight={400}
                        mt={1}
                        color={'gray.700'}>
                        {item}
                      </Text>
                    </VStack>
                  )}
                />

                <VStack space={2}>
                  {selectedSuggests.map(suggest => (
                    <VStack
                      borderRadius={'8px'}
                      w={'full'}
                      borderWidth={'1px'}
                      borderColor={'gray.200'}
                      mr={3}
                      px={2}
                      py={4}>
                      <HStack>
                        <HStack flex={1} alignItems={'center'} space={1}>
                          <Icon
                            name={'check-circle-solid'}
                            size={16}
                            color={theme.colors.violet['200'] as string}
                          />
                          <Text
                            fontSize={'TXS'}
                            fontWeight={400}
                            color={'gray.700'}>
                            Action added
                          </Text>
                        </HStack>

                        <TouchableOpacity
                          onPress={() =>
                            setSelectedSuggests(previous =>
                              previous.filter(pSuggest => pSuggest !== suggest),
                            )
                          }>
                          <HStack
                            bg={'gray.200'}
                            px={'2'}
                            py={1}
                            borderRadius={'500'}
                            alignItems={'center'}
                            space={1}>
                            <Icon name="minus" size={16} />
                            <Text
                              fontSize={'LSM'}
                              fontWeight={500}
                              color={'gray.800'}>
                              Remove
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      </HStack>

                      <Text
                        fontSize={'TXS'}
                        fontWeight={400}
                        mt={1}
                        color={'gray.700'}>
                        {suggest}
                      </Text>
                    </VStack>
                  ))}
                </VStack>
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
